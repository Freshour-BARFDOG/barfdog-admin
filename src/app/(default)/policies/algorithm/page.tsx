import Wrapper from "@/components/layout/wrapper/Wrapper";
import AlgorithmSetting from "@/components/pages/policies/algorithm/AlgorithmSetting";

export const metadata = {
  title: '관리자 | 알고리즘 설정',
};

export const dynamic = 'force-dynamic';

export default function AlgorithmSettingPage() {
  return (
    <Wrapper title="알고리즘 설정">
      <AlgorithmSetting />
    </Wrapper>
  );
}
