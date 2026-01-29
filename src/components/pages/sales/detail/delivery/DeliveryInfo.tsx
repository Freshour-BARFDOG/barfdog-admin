"use client";

import { DeliveryDetailInfo, SalesRecipient } from "@/types/sales";
import React, { useReducer } from "react";
import DetailTable from "@/components/common/detailTable/DetailTable";
import InputField from "@/components/common/inputField/InputField";
import Button from "@/components/common/button/Button";
import { commonWrapper } from "@/styles/common.css";
import useModal from "@/hooks/useModal";
import AddressModal from "@/components/common/modal/addressModal/AddressModal";
import { useUpdateSalesDelivery } from "@/api/sales/mutations/useUpdateSalesDelivery";
import { useToastStore } from "@/store/useToastStore";

interface DeliveryInfoProps {
  deliveryInfo: DeliveryDetailInfo;
  orderConfirmDate: string | null;
  orderId: number;
}

export type State = {
  recipient: SalesRecipient;
  request: string | null;
};

export type Action =
  | { type: "SET_RECIPIENT"; payload: Partial<SalesRecipient> }
  | { type: "SET_REQUEST"; payload: string };

// 리듀서 함수: action.type에 따라 state 변경
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_RECIPIENT":
      return {
        ...state,
        recipient: { ...state.recipient, ...action.payload },
      };
    case "SET_REQUEST":
      return { ...state, request: action.payload };
    default:
      return state;
  }
}

export default function DeliveryInfo({
  deliveryInfo,
  orderConfirmDate,
  orderId,
}: DeliveryInfoProps) {
  const {
    isOpen: isOpenAddressModal,
    onClose: onCloseAddressModal,
    onToggle: onToggleAddressModal,
  } = useModal();

  const { mutate: updateDelivery } = useUpdateSalesDelivery({
    onSuccess: () => addToast("변경이 완료되었습니다!"),
    onError: (err) => {
      console.error(err);
      addToast("변경에 실패했습니다");
    },
  });
  const { addToast } = useToastStore();

  // useReducer(reducer, initialArg, init) 형태로 쓰면, init(deliveryInfo)는 마운트 시 한 번만 실행
  const [state, dispatch] = useReducer(
    reducer,
    deliveryInfo,
    (dto) => ({
      recipient: {
        zipcode: "",
        street: dto.street ?? "",
        detailAddress: dto.detailAddress ?? "",
        name: dto.recipientName ?? "",
        phone: dto.phoneNumber ?? "",
      },
      request: dto.request,
    })
  );

  const handleUpdate = () => {
    updateDelivery({
      orderId,
      body: {
        recipient: state.recipient,
        request: state.request,
      },
    });
  };

  const handleDetailChange = (value: string) => {
    dispatch({ type: "SET_RECIPIENT", payload: { detailAddress: value } });
  };

  const handleRequestChange = (value: string) => {
    dispatch({ type: "SET_REQUEST", payload: value });
  };

  const handleSelectAddress = (data: { address: string; zonecode: string }) => {
    dispatch({
      type: "SET_RECIPIENT",
      payload: { street: data.address, zipcode: data.zonecode },
    });
  };

  const infoList = [
    { label: "수취인명", value: deliveryInfo.recipientName },
    {
      label: "연락처",
      value: deliveryInfo.phoneNumber,
    },
    {
      label: "배송지 주소",
      value: (
        <div className={commonWrapper({ direction: "col", gap: 6 })}>
          <div className={commonWrapper({ gap: 4 })}>
            <InputField disabled value={state.recipient.street} />
            <Button
              variant="outline"
              size="inputButton"
              onClick={onToggleAddressModal}
            >
              주소검색
            </Button>
          </div>
          <div className={commonWrapper({ gap: 4 })}>
            <InputField
              value={state.recipient.detailAddress}
              onChange={(e) => handleDetailChange(e.target.value)}
            />
            <Button size="inputButton" onClick={handleUpdate}>
              변경
            </Button>
          </div>
        </div>
      ),
      fullWidth: true,
    },
    {
      label: "배송 요청사항",
      value: (
        <div className={commonWrapper({ gap: 4 })}>
          <InputField
            value={state.request || ""}
            onChange={(e) => handleRequestChange(e.target.value)}
          />
          <Button size="inputButton" onClick={handleUpdate}>
            변경
          </Button>
        </div>
      ),
      fullWidth: true,
    },
    { label: "발송처리일", value: deliveryInfo.departureDateTime ?? "-" },
    { label: "배송완료일", value: deliveryInfo.arrivalDateTime ?? "-" },
    { label: "송장번호", value: deliveryInfo.trackingNumber ?? "-" },
    { label: "구매확정일", value: orderConfirmDate ?? "-" },
  ];
  return (
    <>
      <DetailTable items={infoList} columns={2} title="배송정보" />
      {isOpenAddressModal && (
        <AddressModal
          isOpen={isOpenAddressModal}
          onClose={onCloseAddressModal}
          onSelectAddressData={handleSelectAddress}
        />
      )}
    </>
  );
}
