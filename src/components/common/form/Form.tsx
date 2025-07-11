import * as styles from './Form.css';
import { ReactNode } from "react";

interface FormProps {
	children: ReactNode;
	gap?: 12 | 16 | 20;
}

export default function Form({
	children,
	gap = 20
}: FormProps) {
	return (
		<form className={styles.formContainer({ gap })}>
			{children}
		</form>
	);
}