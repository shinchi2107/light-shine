import https from "@/src/lib/http";

const uploadApiRequest = {
    sUploadImage: async (body, options) => https.post('/cloudinary/upload-avatar', body, options),
    uploadImage: async (body) => https.post('/api/upload/avatar', body, {
        baseUrl: ''
    }),
}

export default uploadApiRequest;