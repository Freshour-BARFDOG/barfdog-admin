import Text from "@/components/common/text/Text";
import { ReactNode } from "react";

interface WrapperProps {
	title?: string;
	children: ReactNode;
}

const Wrapper = ({
	title,
	children,
}: WrapperProps) => {
	return (
		<section>
			{title &&
				<Text type='title2' style={{ marginBottom: '18px' }}>{title}</Text>
			}
			{children}
		</section>
	);
};

export default Wrapper;