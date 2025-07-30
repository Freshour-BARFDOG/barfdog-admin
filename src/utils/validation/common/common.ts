import * as yup from "yup";

const numberField = () =>
  yup
    .number()
    .typeError("숫자 형식이어야 합니다.")
    .min(0, "0 이상으로 입력해 주세요.")
    .required("값을 입력해 주세요.");

export { numberField };
