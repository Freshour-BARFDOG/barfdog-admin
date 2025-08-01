import { ReactNode } from "react";
import { commonWrapper } from "@/styles/common.css";

interface ListLayoutProps {
	children: ReactNode;
}

const ListLayout = ({
	children,
}: ListLayoutProps) => {
	return (
		<div className={commonWrapper({ direction: 'col', gap: 20 })}>
			{children}
		</div>
	);
};

export default ListLayout;