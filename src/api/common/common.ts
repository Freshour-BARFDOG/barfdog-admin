import axiosInstance from "@/api/axiosInstance";

export { uploadImage };

interface UploadImagesProps {
  file: File;
  apiUrl: string;
}

const uploadImage = async ({ file, apiUrl }: UploadImagesProps) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axiosInstance.post(apiUrl, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      timeout: 50000,
      // onUploadProgress: (progressEvent) => {
      //   const progress = Math.round((progressEvent.loaded * 100) / progressEvent?.total);
      //   console.log(`업로드 진행률: ${progress}%`);
      // },
    });
    return { id: response.data.id, url: response.data.url };
  } catch (error) {
    console.error('파일 업로드 중 에러 발생:', error);
    throw new Error('업로드에 실패했습니다.');
  }
};