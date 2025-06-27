import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { cleanQueryParams } from "@/utils/cleanQueryParams";
import { parseQueryToValues } from "@/utils/parseQueryToValues";

export default function useSearchValues<T extends object>(initialValues: T) {
	const router = useRouter();
	const searchParams = useSearchParams();

	// 컴포넌트 첫 렌더링 시 URL 에 맞는 상태를 바로 반영하여 UI 깜빡임 방지
	// 쿼리 파라미터를 initialValues 타입에 맞게 파싱하여 초기 상태로 사용
	const parsedInitial = parseQueryToValues(searchParams, initialValues);

	const [searchValues, setSearchValues] = useState<T>(parsedInitial);
	const [submittedValues, setSubmittedValues] = useState<T>(parsedInitial);
	const [page, setPage] = useState(0);

	// 브라우저 뒤로가기, 새로고침, 직접 URL 진입 시 쿼리 파라미터를 상태로 복원하기 위한 로직
	useEffect(() => {
		const updated = parseQueryToValues(searchParams, initialValues);
		setSearchValues(updated);
		setSubmittedValues(updated);
		setPage(Number(searchParams.get("page") ?? 0));
	}, [searchParams.toString()]);

	// 쿼리 스트링 업데이트 함수 (불필요한 빈 값 등은 cleanQueryParams 로 제거)
	const updateQuery = (params: Record<string, any>) => {
		const cleaned = cleanQueryParams(params);

		const query = new URLSearchParams(cleaned).toString();
		router.replace(`?${query}`);
	}

	// 검색 실행 시 상태 업데이트 및 쿼리 스트링 반영
	const onSubmit = () => {
		setSubmittedValues(searchValues);
		setPage(0);
    updateQuery({ ...searchValues, page: 0 });
	};

	// 검색 리셋 시 초기값으로 상태 및 쿼리 스트링 초기화
	const onReset = () => {
		setSearchValues(initialValues);
		setSubmittedValues(initialValues);
		setPage(0);
    updateQuery({ ...initialValues, page: 0 });
	};

	// 페이지 변경 시 페이지 상태 업데이트 및 쿼리 스트링 반영
	const onChangePage = (page: number) => {
		setPage(page);
		updateQuery({ ...searchValues, page: page });
	}

	return {
		searchValues,
		setSearchValues,
		submittedValues,
		page,
		setPage,
		onChangePage,
		onSubmit,
		onReset,
	}
}