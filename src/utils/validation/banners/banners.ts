import { StatusType } from "@/types/common";
import { BannerTarget, PopupPosition } from "@/types/banners";
import * as yup from "yup";

export const bannerSchema = yup.object().shape({
	name: yup
		.string()
		.required('프로모션 이름은 필수입니다.'),
	pcLinkUrl: yup
		.string(),
	mobileLinkUrl: yup
		.string(),
	status: yup
		.string()
		.oneOf(['LEAKED', 'HIDDEN'], '유효한 배너 상태여야 합니다.')
		.required('상태는 필수입니다.'),
});

export const defaultMyPageBannerFormValues = {
	status: "LEAKED" as StatusType,
	name: "",
	pcLinkUrl: "",
	mobileLinkUrl: "",
}

export const mainBannerSchema = yup.object().shape({
	name: yup
		.string()
		.required('배너 이름은 필수입니다.'),
	pcLinkUrl: yup
		.string(),
	mobileLinkUrl: yup
		.string(),
	targets: yup
		.string()
		.oneOf(['ALL', 'SUBSCRIBER', 'USER', 'GUEST'], '유효한 노출 대상이어야 합니다.')
		.required('노출 대상은 필수입니다.'),
	status: yup
		.string()
		.oneOf(['LEAKED', 'HIDDEN'], '유효한 배너 상태여야 합니다.')
		.required('상태는 필수입니다.'),
});

export const defaultMainBannerFormValues = {
	status: "LEAKED" as StatusType,
	targets: "ALL" as BannerTarget,
	name: "",
	pcLinkUrl: "",
	mobileLinkUrl: "",
}

export const popupSchema = yup.object().shape({
	name: yup
		.string()
		.required('팝업 이름은 필수입니다.'),
	pcLinkUrl: yup
		.string(),
	mobileLinkUrl: yup
		.string(),
	position: yup
		.string()
		.oneOf(['LEFT', 'MID', 'RIGHT'], '유효한 팝업 위치여야 합니다.')
		.required('팝업 위치는 필수입니다.'),
	status: yup
		.string()
		.oneOf(['LEAKED', 'HIDDEN'], '유효한 팝업 상태여야 합니다.')
		.required('상태는 필수입니다.'),
});

export const defaultPopupFormValues = {
	status: "LEAKED" as StatusType,
	position: "LEFT" as PopupPosition,
	name: "",
	pcLinkUrl: "",
	mobileLinkUrl: "",
}