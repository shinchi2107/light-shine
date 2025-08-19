import https from "@/src/lib/http";

const accountApiRequest = {
    sGetAccountProfile: async (options) => https.get('/account/profile', options),
    getAccountProfile: async () => https.get('/api/account/profile', {
        baseUrl: '',
    }),
    sUpdateAccountProfile: async (body, options) => https.put('/account/update', body, options),
    updateAccountProfile: async (body) => https.put('/api/account/update', body, {
        baseUrl: '',
    }),
    sUpdateAccountPassword: async (body, options) => https.put('/account/update-password', body, options),
    updateAccountPassword: async (body) => https.put('/api/account/update-password', body, {
        baseUrl: '',
    }),
}

export default accountApiRequest;