import { useState } from "react";

export default function useSearchValues<T extends object>(initialValues: T) {
	const [searchValues, setSearchValues] = useState<T>(initialValues);
	const [submittedValues, setSubmittedValues] = useState<T>(initialValues);
	const [page, setPage] = useState(0);

	const onSubmit = () => {
		setSubmittedValues(searchValues);
		setPage(0);
	};

	const onReset = () => {
		setSearchValues(initialValues);
		setSubmittedValues(initialValues);
		setPage(0);
	};

	return {
		searchValues,
		setSearchValues,
		submittedValues,
		page,
		setPage,
		onSubmit,
		onReset,
	}
}