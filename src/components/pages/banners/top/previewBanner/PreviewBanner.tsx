import sanitizeHtml from 'sanitize-html';

interface PreviewBannerProps {
	htmlText: string;
	backgroundColor?: string;
	fontColor?: string;
	height?: number;
}
import * as styles from './PreviewBanner.css';
export default function PreviewBanner({
	htmlText,
	backgroundColor = '#ffffff',
	fontColor = '#000000',
	height = 60,
}: PreviewBannerProps) {
	return (
		<div
			className={styles.previewBanner}
			style={{
				backgroundColor,
				color: fontColor,
				height: height,
			}}
			dangerouslySetInnerHTML={{ __html: sanitizeHtml(htmlText, {
					allowedTags: ['b', 'i', 'br', 'u'],
					allowedAttributes: {},
				}) }}
		/>
	);
}