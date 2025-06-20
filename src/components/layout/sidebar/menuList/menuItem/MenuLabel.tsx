import Text from "@/components/common/text/Text";

interface MenuLabelProps {
	active: boolean;
	label: string;
	className?: string;
	onClick?: () => void;
}

const MenuLabel = ({ active, label, className, onClick }: MenuLabelProps) => {
	return (
		<div onClick={onClick}>
			<Text
				type='label3'
				color={active ? 'red' : 'gray900'}
				className={className || ''}
			>
				{label}
			</Text>
		</div>
	);
};

export default MenuLabel;