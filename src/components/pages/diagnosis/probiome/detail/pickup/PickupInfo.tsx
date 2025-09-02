import DetailTable from "@/components/common/detailTable/DetailTable";
import { TableItem } from "@/types/common";
import { PickupRequestInfo } from "@/types/diagnosis";
import { formatPhoneNumber } from "@/utils/formatPhoneNumber";
import Image from "next/image";
import { petDefecationImage } from "../ProbiomeDetail.css";
import Card from "@/components/common/card/Card";

interface PickupInfoProps {
  pickupData: PickupRequestInfo;
}

export default function PickupInfo({ pickupData }: PickupInfoProps) {
  const infoList: TableItem[] = [
    {
      label: "회수 신청일",
      value: pickupData.pickupRequestedDate,
    },
    {
      label: "수령인",
      value: pickupData.deliveryAddressInfo.recipientName,
    },
    {
      label: "연락처",
      value: formatPhoneNumber(pickupData.deliveryAddressInfo.phoneNumber),
    },
    {
      label: "주소",
      value: `${pickupData.deliveryAddressInfo.street} ${pickupData.deliveryAddressInfo.city} ${pickupData.deliveryAddressInfo.detailAddress}`,
    },
    {
      label: "변 이미지",
      value: (
        <>
          {pickupData.defecationFileList[0] ? (
            <Image
              src={pickupData.defecationFileList[0]?.displayImageUrl.url}
              width={100}
              height={100}
              alt="변 이미지"
              className={petDefecationImage}
            />
          ) : (
            "-"
          )}
        </>
      ),
      fullWidth: true,
    },
  ];
  return (
    <Card padding={20}>
      <DetailTable items={infoList} columns={2} title="회수 신청 정보" />
    </Card>
  );
}
