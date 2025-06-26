import * as styles from './Loader.css';

interface LoaderProps {
	fullscreen?: boolean;
	height?: number;
	padding?: 0 | 20;
}

const Loader = ({
	fullscreen = false,
	height,
	padding = 0
}: LoaderProps) => {
	return (
		fullscreen
			? (
				<div className={styles.loaderContainer}>
					<span className={styles.loader} />
				</div>
			)
			: <div className={styles.loaderBox} style={{ height: height || 'auto', padding: padding }}><span className={styles.loader} /></div>
	);
};

export default Loader;