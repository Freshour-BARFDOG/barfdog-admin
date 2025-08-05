"use client";
import * as styles from "./Login.css";
import * as yup from "yup";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Controller } from "react-hook-form";
import Card from "@/components/common/card/Card";
import Logo from "/public/images/logo/logo-emblem.svg";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import Text from "@/components/common/text/Text";
import InputField from "@/components/common/inputField/InputField";
import Button from "@/components/common/button/Button";
import { useEmailLogin } from "@/api/auth/mutations/useEmailLogin";
import { useFormHandler } from "@/hooks/useFormHandler";

interface LoginFormValues {
  email: string;
  password: string;
}

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("유효한 이메일 주소를 입력해주세요.")
    .required("이메일 주소는 필수입니다."),
  password: yup.string().required("비밀번호는 필수입니다."),
});

const defaultLoginValues = {
  email: "",
  password: "",
  autoLogin: false,
};

const Login = () => {
  const searchParams = useSearchParams();
  const nextPath = useMemo(
    () => searchParams.get("next") ?? "/",
    [searchParams]
  );
  const { mutate: emailLogin } = useEmailLogin();
  const { handleSubmit, control, isValid } = useFormHandler<LoginFormValues>(
    loginSchema,
    defaultLoginValues
  );

  const handleLogin = (data: LoginFormValues) => {
    const formData = {
      email: data.email,
      password: data.password,
    };

    // 로그인 호출, 성공 시 nextPath로 풀 리로드
    emailLogin(formData, {
      onSuccess: () => {
        // 풀 리로드로 쿠키 적용 보장하면서 원래 경로로 이동
        window.location.href = nextPath;
      },
    });
  };

  return (
    <section className={styles.loginContainer}>
      <div className={styles.loginCardWrapper}>
        <Card
          gap={20}
          padding={32}
          borderRadius={16}
          shadow="light"
          align="center"
          justify="center"
        >
          <div className={styles.loginLogo}>
            <SvgIcon src={Logo} size={68} />
            <Text type="title3" align="center" block>
              관리자 로그인
            </Text>
          </div>
          <form className={styles.loginForm}>
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <InputField
                  id="email"
                  placeholder="이메일 주소를 입력해주세요"
                  label="이메일"
                  {...field}
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <InputField
                  masking
                  id="password"
                  placeholder="비밀번호를 입력해주세요"
                  onSubmit={isValid ? handleSubmit(handleLogin) : undefined}
                  {...field}
                />
              )}
            />
          </form>
          <div className={styles.loginControls}>
            {/*<LabeledCheckbox*/}
            {/*	value={formValues.autoLogin}*/}
            {/*	isChecked={formValues.autoLogin}*/}
            {/*	onToggle={(value) => setFormValues({ ...formValues, autoLogin: !value })}*/}
            {/*	label='자동로그인'*/}
            {/*/>*/}
            <button>
              <Text type="body3">비밀번호 재설정</Text>
            </button>
          </div>
          <Button
            fullWidth
            onClick={handleSubmit(handleLogin)}
            disabled={!isValid}
          >
            로그인
          </Button>
        </Card>
      </div>
    </section>
  );
};

export default Login;
