import {commonWrapper} from "@/styles/common.css";
import Text from "@/components/common/text/Text";
import Image from "next/image";
import FileUpload from "@/components/common/fileUpload/FileUpload";
import InputFieldGroup from "@/components/common/inputFieldGroup/InputFieldGroup";

interface ImageSize {
	top: {
		width: number | 'full';
		height: number;
	};
	bottom: {
		width: number | 'full';
		height: number;
	};
}

interface ImageCaption {
	top?: string;
	bottom?: string;
}

interface ThumbnailImageProps {
	thumbnailId: number | null;
	thumbnailUrl?: string;
	filename?: string;
	imageSize: ImageSize;
	imageCaption: ImageCaption;
	captions?: string[];
	handleThumbnailChange: (file: File | null) => Promise<void>;
}

export default function ThumbnailImage({
	thumbnailId,
	thumbnailUrl,
	filename,
	imageSize,
	imageCaption,
	captions,
	handleThumbnailChange,
}: ThumbnailImageProps) {
	return (
		<InputFieldGroup label='썸네일' align='start'>
			<div className={commonWrapper({ direction: 'col', gap: 12, align: 'start' })}>
				{(thumbnailId && thumbnailUrl) &&
        <div className={commonWrapper({ direction: 'col', align: 'start' })}>
	        {imageCaption.top &&
            <Text type='caption' color='gray500'>{imageCaption.top}</Text>
	        }
          <Image
            src={thumbnailUrl ?? ''}
            alt={filename ?? ''}
            width={imageSize.top.width === 'full' ? 1200 : imageSize.top.width}
            height={imageSize.top.height}
            style={{
							width: imageSize.top.width === 'full' ? '100%' : imageSize.top.width,
	            objectFit: imageSize.bottom.width === 'full' ? 'contain' : 'cover',
            }}
          />
        </div>
				}
				<FileUpload
					inputId='file-input-thumbnailId-2'
					onFileChange={handleThumbnailChange}
					defaultImageUrl={thumbnailUrl}
					imageName={filename ?? ''}
					width={imageSize.bottom.width !== 'full' ? imageSize.bottom.width : undefined}
					fullWidth={imageSize.bottom.width === 'full'}
					height={imageSize.bottom.height}
					objectFit={imageSize.bottom.width === 'full' ? 'contain' : 'cover'}
					topCaption={(thumbnailId && thumbnailUrl) && imageCaption.bottom ? imageCaption.bottom : ''}
				/>
				<div>
					{captions && captions.map(caption => (
						<Text key={caption} type='caption' color='gray500' block>{caption}</Text>
					))}
				</div>
			</div>
		</InputFieldGroup>
	);
}