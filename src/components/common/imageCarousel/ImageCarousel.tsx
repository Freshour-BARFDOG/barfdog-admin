import {
  previewImage,
  previewSlide,
  previewSlider,
  removeButton,
  thumbnail,
} from "./ImageCarousel.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import CloseButton from "/public/images/icons/close-circle-fill.svg";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import Text from "../text/Text";

interface InitialImages {
  id?: number;
  filename: string;
  url: string;
}

interface ImageCarouselProps {
  imageList: InitialImages[];
  width?: number;
  height?: number;
  handleRemoveFile?: (filename: string, id: number | undefined) => void;
  handleThumbnailClick?: (index: number, id?: number) => void;
  showRepresentativeLabel?: boolean;
}

export default function ImageCarousel({
  imageList,
  width = 100,
  height = 100,
  handleRemoveFile,
  handleThumbnailClick,
  showRepresentativeLabel = false,
}: ImageCarouselProps) {
  return (
    <Swiper slidesPerView="auto" spaceBetween={4} className={previewSlider}>
      <ul>
        {imageList.map((preview, index) => {
          return (
            <SwiperSlide
              key={
                preview.id
                  ? `image-${preview.id}`
                  : `image-${preview.filename}-${index}`
              }
              className={previewSlide({ showRepresentativeLabel })}
              style={{
                width: width,
                height: height,
                cursor: handleRemoveFile ? "grabbing" : "default",
              }}
              onClick={
                handleThumbnailClick
                  ? () => handleThumbnailClick(index, preview.id)
                  : undefined
              }
            >
              {index === 0 && showRepresentativeLabel && (
                <Text type="caption" color="white" className={thumbnail}>
                  대표
                </Text>
              )}
              <li>
                <Image
                  src={preview.url}
                  alt={`${preview.filename}-${index}`}
                  width={width}
                  height={height}
                  className={previewImage}
                />
                {handleRemoveFile && (
                  <button
                    type="button"
                    onClick={() =>
                      handleRemoveFile(preview.filename, preview.id)
                    }
                    className={removeButton}
                  >
                    <SvgIcon src={CloseButton} size={20} color="gray0" />
                  </button>
                )}
              </li>
            </SwiperSlide>
          );
        })}
      </ul>
    </Swiper>
  );
}
