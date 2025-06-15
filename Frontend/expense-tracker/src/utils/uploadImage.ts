import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosInstance";

interface UploadImageResponse {
    imageUrl: string;
    message: string;
}

const uploadImage = async (imageFile: File): Promise<UploadImageResponse> => {
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
        const response = await axiosInstance.post<UploadImageResponse>(API_PATHS.IMAGE.UPLOAD_IMAGE, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return response.data;
    }
    catch (error) {
        console.error("Error uploading image:", error);
        throw error;
    }
}

export default uploadImage;