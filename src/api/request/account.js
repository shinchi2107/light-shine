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
    sGetAllAccounts: async (options) => https.get('/account/get-all', options),
    getAllAccounts: async ({ params, signal }) => https.get('/api/account/get-all', {
        baseUrl: '',
        params,
        signal
    }),
    sCreateAccount: async (body, options) => https.post('/account/create', body, options),
    createAccount: async (body) => https.post('/api/account/create-account', body, {
        baseUrl: '',
    }),
}

export default accountApiRequest;