import * as styles from "./imageSlider.css";
import Chips from "@/components/common/chips/Chips";
import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import type { Swiper as SwiperType } from 'swiper/types';
import { ImageFile } from "@/types/common";

interface ImageSlideProps {
	imageList: ImageFile[];
	defaultImageIndex: number;
	showPadding?: boolean;
	onSwiperInit?: (swiper: SwiperType) => void;
	handleImageClick?: (index: number) => void;
}

const ImageSlider = ({
	imageList,
	defaultImageIndex = 0,
	showPadding = true,
	onSwiperInit,
	handleImageClick,
}: ImageSlideProps) => {

	return (
		<div className={styles.imageList({ showPadding })}>
			<Swiper
				slidesPerView='auto'
				initialSlide={defaultImageIndex}
				modules={[ Navigation ]}
				navigation={true}
				onSwiper={(swiper) => onSwiperInit?.(swiper)}
			>
				{imageList.map((reviewImage, index) => (
					<SwiperSlide
						key={reviewImage.filename}
						className={styles.imageSlider}
						onClick={handleImageClick ? () => handleImageClick(index) : undefined}
					>
						<Chips variant='solid' color='red' borderRadius='lg' size='sm' className={styles.imageCountChip}>
							{index+1} / {imageList.length}
						</Chips>
						<Image src={reviewImage.url} alt={reviewImage.filename} width={335} height={335} className={styles.image} />
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};

export default ImageSlider;