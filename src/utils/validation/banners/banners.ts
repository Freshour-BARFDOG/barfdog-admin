import { BannerStatus, BannerTarget } from "@/types/banners";
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


export const mainBannerSchema = yup.object().shape({
	name: yup
		.string()
		.required('프로모션 이름은 필수입니다.'),
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
	status: "LEAKED" as BannerStatus,
	targets: "ALL" as BannerTarget,
	name: "",
	pcLinkUrl: "",
	mobileLinkUrl: "",
}