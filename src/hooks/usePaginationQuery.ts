import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function usePaginationQuery(defaultPage = 0) {
	const router = useRouter();
	const searchParams = useSearchParams();

	const [page, setPage] = useState<number>(
		Number(searchParams.get('page')) || defaultPage
	);

	useEffect(() => {
		setPage(Number(searchParams.get('page')) || defaultPage);
	}, [searchParams.toString()]);

	const updateQuery = (newPage: number) => {
		const params = new URLSearchParams(searchParams);
		params.set('page', String(newPage));
		router.replace(`?${params.toString()}`);
	};

	const onChangePage = (newPage: number) => {
		setPage(newPage);
		updateQuery(newPage);
	};

	return {
		page,
		onChangePage,
	};
}
