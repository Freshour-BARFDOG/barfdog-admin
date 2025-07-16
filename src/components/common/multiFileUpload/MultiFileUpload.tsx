import * as styles from "./MultiFileUpload.css";
import { ChangeEvent, useState } from "react";
import UploadLabel from "/public/images/icons/upload-label.svg";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import { useUploadImage } from "@/api/common/mutations/useUploadImage";
import { ImageFile } from "@/types/common";
import ImageCarousel from "../imageCarousel/ImageCarousel";
import Text from "../text/Text";

interface InitialImages {
  id?: number;
  filename: string;
  url: string;
}

interface MultiFileUploadProps {
  uploadApiUrl: string;
  maxFiles?: number;
  maxSize?: number;
  allowedExtensions?: string[];
  imageWidth?: number;
  imageHeight?: number;
  initialImages?: ImageFile[];
  onFilesChange: (file: ImageFile[] | null) => void;
  handleRemove: (id: number) => void;
  title?: string;
  subTitle?: string;
  className?: string;
  showRepresentativeLabel?: boolean;
}

const MultiFileUpload = ({
  uploadApiUrl,
  onFilesChange,
  maxFiles = 10,
  maxSize = 9 * 1024 * 1024,
  allowedExtensions = ["image/jpeg", "image/jpg", "image/png", "image/gif"],
  imageWidth = 100,
  imageHeight = 100,
  initialImages = [],
  handleRemove,
  title,
  subTitle,
  className,
  showRepresentativeLabel = false,
}: MultiFileUploadProps) => {
  const [uploadedImages, setUploadedImages] =
    useState<InitialImages[]>(initialImages);
  const [errors, setErrors] = useState<string[]>([]);
  const { mutate } = useUploadImage(uploadApiUrl);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    // uploadedImages: 이미 업로드된 파일 목록
    // selectedFiles: 새로 선택된 파일 목록
    // initialImages: 초기 이미지(이미 로드된 상태) 목록

    const selectedFiles = e.target.files ? Array.from(e.target.files) : [];
    const newErrors: string[] = [];

    // 업데이트될 uploadedImages, mutation 후 부모에게 보낼 배열
    const uploadedFiles: InitialImages[] = [];

    const totalFiles = [...uploadedImages, ...selectedFiles];
    if (totalFiles.length + initialImages?.length > maxFiles) {
      setErrors([`최대 ${maxFiles}개의 이미지만 업로드할 수 있습니다.`]);
      return;
    }

    for (const file of selectedFiles) {
      if (file.size > maxSize) {
        newErrors.push(
          `${file.name}: 파일 크기가 ${maxSize / 1024 / 1024}MB를 초과했습니다.`
        );
      } else if (!allowedExtensions.includes(file.type)) {
        newErrors.push(`${file.name}: 허용되지 않는 파일 형식입니다.`);
      } else {
        // 비동기 파일 업로드
        await new Promise<void>((resolve, reject) => {
          try {
            mutate(
              { file },
              {
                onSuccess: (data) => {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    uploadedFiles.push({
                      id: data.id,
                      filename: file.name,
                      url: reader.result as string,
                    });
                    resolve();
                  };
                  reader.readAsDataURL(file);
                },
                onError: (error) => {
                  console.error("Upload Error:", error);
                  reject();
                },
              }
            );
          } catch (error) {
            console.log(error);
            reject();
          }
        });
      }
    }

    // 모든 파일 업로드가 완료된 후 상태를 한 번에 업데이트
    setErrors(newErrors);
    setUploadedImages((prev) => [...prev, ...uploadedFiles]);
    onFilesChange([...uploadedImages, ...uploadedFiles]);
  };

  const handleRemoveFile = (filename: string, id: number | undefined) => {
    const newUploadedImages = uploadedImages.filter((file) => file.id !== id);

    setUploadedImages(newUploadedImages);
    if (id) {
      handleRemove(id);
    }
  };

  return (
    <div className={className || ""}>
      <div className={styles.fileUploadTitle}>
        {title && <Text type="label4">{title}</Text>}
        {subTitle && (
          <Text type="caption" color="gray500">
            첫 번째 이미지가 대표 이미지로 노출됩니다.
          </Text>
        )}
      </div>
      <div>
        <div className={styles.uploadBox}>
          <label htmlFor="file-input" className={styles.uploadLabel}>
            <SvgIcon src={UploadLabel} size={24} />
          </label>
          <input
            type="file"
            id="file-input"
            accept="image/jpeg, image/jpg, image/png, image/gif"
            multiple
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          {uploadedImages.length > 0 && (
            <div style={{ width: "calc(100% - 104px)" }}>
              <ImageCarousel
                width={imageWidth}
                height={imageHeight}
                imageList={uploadedImages}
                handleRemoveFile={handleRemoveFile}
                showRepresentativeLabel={showRepresentativeLabel}
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
          <Text type="caption" color="gray500">
            • 파일은 최대 10장 이내로 등록 가능합니다.
            <br />• 파일크기는 10MB이하 / jpg, jpeg, png, gif 형식만 등록
            가능합니다.
          </Text>
        </div>
      </div>
    </div>
  );
};

export default MultiFileUpload;
