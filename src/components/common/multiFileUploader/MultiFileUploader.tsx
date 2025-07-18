import * as styles from "./MultiFileUploader.css";
import { ChangeEvent } from "react";
import UploadLabel from "/public/images/icons/upload-label.svg";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import { ImageFile } from "@/types/common";
import ImageCarousel from "../imageCarousel/ImageCarousel";
import Text from "../text/Text";
import useMultiFileUploader from "@/hooks/useMultiFileUploader";

interface MultiFileUploadProps {
  maxFiles?: number;
  onChange?: (files: File[]) => void;
  onRemove?: (id: number | undefined, filename: string) => void;
  width?: number;
  height?: number;
  captions?: string[];
  className?: string;
  initialFiles?: ImageFile[];
}

const MultiFileUploader = ({
  maxFiles = 10,
  onChange,
  onRemove,
  width = 100,
  height = 100,
  captions,
  className,
  initialFiles = [],
}: MultiFileUploadProps) => {
  const { files, addFiles, removeFile, errors } = useMultiFileUploader({
    initialFiles,
    maxFiles,
  });

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      addFiles(e.target.files);
      if (onChange) {
        onChange(Array.from(e.target.files));
      }
    }
  }

  const handleRemove = (id: number | undefined, filename: string) => {
    removeFile(filename)
    if (onRemove) {
      onRemove(id, filename);
    }
  }

  return (
    <div className={className || ""}>
      <div className={styles.uploadBox}>
        <label htmlFor="file-input" className={styles.uploadLabel}>
          <SvgIcon src={UploadLabel} size={24} />
        </label>
        <input
          type="file"
          id="file-input"
          multiple
          hidden
          onChange={handleFileChange}
        />
        {files.length > 0 && (
          <div style={{ width: "calc(100% - 104px)" }}>
            <ImageCarousel
              width={width}
              height={height}
              imageList={files}
              handleRemoveFile={handleRemove}
            />
          </div>
        )}
      </div>
      <div className={styles.uploadInfo}>
        {errors.length > 0 && (
          <div className={styles.error}>
            {errors.map((error) => (
              <Text key={error} type="caption" color="red">
                {error}
              </Text>
            ))}
          </div>
        )}
        {captions && captions.map(caption => (
          <Text key={caption} type="caption" color="gray500" block>
            {caption}
          </Text>
        ))}
      </div>
    </div>
  );
};

export default MultiFileUploader;
