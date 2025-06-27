import * as styles from './Loader.css';

interface LoaderProps {
	fullscreen?: boolean;
	height?: number;
	padding?: 0 | 20;
	size?: 24 | 48
}

export default function Loader({
	fullscreen = false,
	height,
	padding = 0,
	size = 48,
}: LoaderProps) {
	return (
		fullscreen
			? (
				<div className={styles.loaderContainer}>
					<span className={styles.loader({})} />
				</div>
			)
			: (
				<div className={styles.loaderBox} style={{ height: height || 'auto', padding: padding }}>
					<span className={styles.loader({ size: size })} />
				</div>
			)
	);
};
