import {
  previewImage,
  previewSlide,
  previewSlider,
  removeButton,
} from "./ImageCarousel.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import { X } from "lucide-react";
import { ImageFile } from "@/types/common";

interface ImageCarouselProps {
  imageList: ImageFile[];
  width?: number;
  height?: number;
  handleRemoveFile?: (id: number | undefined, filename: string) => void;
  handleThumbnailClick?: (index: number, id?: number) => void;
}

export default function ImageCarousel({
  imageList,
  width = 100,
  height = 100,
  handleRemoveFile,
  handleThumbnailClick,
}: ImageCarouselProps) {
  const imageStyle = {
    width,
    height,
  };

  return (
    <Swiper slidesPerView="auto" className={previewSlider}>
      {imageList.map((preview, index) => {
        return (
          <SwiperSlide
            key={`image-${preview.id ?? `${preview.filename}-${index}`}`}
            className={previewSlide}
            style={imageStyle}
            onClick={
              handleThumbnailClick
                ? () => handleThumbnailClick(index, preview.id)
                : undefined
            }
          >
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
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveFile(preview.id, preview.filename);
                }}
                className={removeButton}
              >
                <X size={20} color="gray" />
              </button>
            )}
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
