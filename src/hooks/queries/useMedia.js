import { useMutation } from "@tanstack/react-query"
import uploadApiRequest from "@/src/api/request/upload";

const useMediaUploadAvatar = () => {
    return useMutation({
        mutationFn: uploadApiRequest.uploadImage,
    });
}

export { useMediaUploadAvatar };