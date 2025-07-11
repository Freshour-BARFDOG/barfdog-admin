import * as yup from "yup";
import { BannerStatus } from "@/types/banners";

export const myPageBannerSchema = yup.object().shape({
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