import https from "@/src/lib/http";

const authApiRequest = {
   sLogin: async (body) => https.post('/auth/login', body),
   login: async (body) => https.post('/api/auth/login', body, {
    baseUrl: ''
   }),
   sRegister: async (body) => https.post('/auth/register', body),
   register: async (body) => https.post('/api/auth/register', body, {
    baseUrl: ''
   }),
   sLogout: async (body, options) => https.post('/auth/logout', body, options),
   logout: async (body) => https.post('/api/auth/logout', body, {
    baseUrl: ''
   }),
}

export default authApiRequest;