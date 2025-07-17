'use client';
import { ChangeEvent, MouseEvent, useState } from "react";
import * as styles from './FileUpload.css';
import Image from "next/image";
import Text from "@/components/common/text/Text";
import { CircleX, ImageUp } from "lucide-react";

type ImageFileObjectFit = 'cover' | 'contain';

interface FileUploadProps {
  inputId: string;
  onFileChange: (file: File | null) => void;
  maxSize?: number;
  defaultImageUrl?: string;
  imageName: string;
  width?: number;
  height?: number;
  borderRadius?: boolean;
  fullWidth?: boolean;
  objectFit?: ImageFileObjectFit;
  caption?: string;
  topCaption?: string;
  showClearButton?: boolean;
}

const FileUpload = ({
  inputId,
  onFileChange,
  maxSize = 10 * 1024 * 1024,
  defaultImageUrl,
  imageName,
  width,
  height,
  fullWidth = false,
  borderRadius = false,
  objectFit = 'cover',
  caption,
  topCaption,
  showClearButton = false,
}: FileUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(defaultImageUrl ?? null);
  const [clearFile, setClearFile] = useState<boolean>(false);

  const resetFileState = () => {
    setFile(null);
    setPreviewUrl(null);
    onFileChange(null);
  }

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setClearFile(false);
    const selectedFile = e.target.files ? e.target.files[0] : null;
    if (selectedFile) {
      if (selectedFile.size > maxSize) {
        setError(`파일 크기가 ${maxSize / 1024 / 1024}MB를 초과할 수 없습니다.`);
        resetFileState();
        return;
      }

      const allowedExtensions = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
      if (!allowedExtensions.includes(selectedFile.type)) {
        setError('허용되지 않은 파일 형식입니다. (JPG, JPEG, PNG, GIF만 허용)');
        resetFileState();
        return;
      }

      setFile(selectedFile);
      setError(null);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);

      onFileChange(selectedFile);
    }
  }
  
  const handleClearFile = (e: MouseEvent) => {
		e.preventDefault();
    resetFileState();
    setError(null);
    setClearFile(true);
  }

  return (
    <div className={styles.fileUploadContainer}>
      <div>
        {topCaption &&
          <Text type='caption' color='gray500'>{topCaption}</Text>
        }
        <label htmlFor={inputId} className={styles.fileUploadLabel}>
          {!previewUrl
            ? <ImageUp />
            : (
              <Image
                src={previewUrl}
                alt={imageName}
                width={width ?? 0}
                height={height ?? 0}
                style={{ width: fullWidth ? '100%' : width, height: fullWidth ? 'auto' : undefined }}
                className={styles.imageFile({ borderRadius, objectFit })}
              />
            )
          }
          <div>
            <Text type='body3' className={styles.fileUploadButton}>파일 선택</Text>
            <Text type='caption2'>{file?.name || (clearFile ? '' : imageName)}</Text>
            {showClearButton && !clearFile &&
              <button onClick={handleClearFile}>
                <CircleX />
              </button>
            }
          </div>
        </label>
        <input
          type="file"
          id={inputId}
          accept='image/jpeg, image/jpg, image/png, image/gif'
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
      </div>
      {caption &&
        <Text type='caption' color='gray500'>* {caption}</Text>
      }
    </div>
  );
};

export default FileUpload;