'use client';
import { useState } from "react";
import Pagination from "@/components/common/pagination/Pagination";

const ExPagination = () => {
	const [currentPage, setCurrentPage] = useState(0);

	return (
		<div>
			<Pagination
				currentPage={currentPage}
				totalPages={5}
				onPageChange={(page) => setCurrentPage(page)}
			/>
			<Pagination
				currentPage={currentPage}
				totalPages={7}
				onPageChange={(page) => setCurrentPage(page)}
			/>
			<Pagination
				currentPage={currentPage}
				totalPages={12}
				onPageChange={(page) => setCurrentPage(page)}
			/>
		</div>
	);
};

export default ExPagination;