import envConfig, { defaultLocale } from "@/src/configs/config";
import Cookies from "js-cookie";
import { getAccessTokenFromLocalStorage, normalizePath, removeTokensFromLocalStorage, setAccessTokenToLocalStorage, setRefreshTokenToLocalStorage } from "./utils";
import { redirect } from "next/navigation";

const ENTITY_ERROR_STATUS = 422
const AUTHENTICATION_ERROR_STATUS = 401

export class HttpError extends Error {
    constructor({ status, payload, message = 'HTTP Error' }) {
        super(message);
        this.status = status;
        this.payload = payload;
    }
}

export class EntityError extends HttpError {
    constructor({ status, payload }) {
        super({ status, payload, message: 'Entity Error' });
        this.status = status;
        this.payload = payload;
    }
}

let clientLogoutRequest = null;
const isClient = typeof window !== 'undefined';


const request = async (method, url, options) => {

    let body = undefined;
    if (options?.body instanceof FormData) {
        body = options.body;
    } else if (options?.body) {
        body = JSON.stringify(options.body);
    }

    const baseHeaders =
        body instanceof FormData
            ? {}
            : {
                'Content-Type': 'application/json'
            };

    if (isClient) {
        const accessToken = getAccessTokenFromLocalStorage();
        if (accessToken) {
            baseHeaders.Authorization = `Bearer ${accessToken}`;
        }
    }

    const baseUrl =
        options?.baseUrl === undefined
            ? envConfig.NEXT_PUBLIC_API_ENDPOINT
            : options.baseUrl;

    const fullUrl = `${baseUrl}/${normalizePath(url)}`;
    const res = await fetch(fullUrl, {
        ...options,
        headers: {
            ...baseHeaders,
            ...options?.headers
        },
        body,
        method
    });


    const payload = await res.json();
    const data = {
        status: res.status,
        payload
    };


    // Interceptor
    if (!res.ok) {
        if (res.status === ENTITY_ERROR_STATUS) {
            throw new EntityError({
                status: 422,
                payload: data.payload
            });
        } else if (res.status === AUTHENTICATION_ERROR_STATUS) {
            if (isClient) {
                const locale = Cookies.get('NEXT_LOCALE');
                if (!clientLogoutRequest) {
                    clientLogoutRequest = fetch('/api/auth/logout', {
                        method: 'POST',
                        body: null,
                        headers: {
                            ...baseHeaders
                        }
                    });
                    try {
                        await clientLogoutRequest;
                    } catch (error) {
                    } finally {
                        removeTokensFromLocalStorage();
                        clientLogoutRequest = null;
                        location.href = `/${locale}/login`;
                    }
                }
            } else {
                const accessToken = (options?.headers)?.Authorization.split('Bearer ')[1];
                const locale = Cookies.get('NEXT_LOCALE');
            }
        } else {
            throw new HttpError(data);
        }
    }

    if (isClient) {
        const normalizeUrl = normalizePath(url);
        if (['api/auth/login', 'api/guest/auth/login'].includes(normalizeUrl) && payload.data) {
            const { accessToken, refreshToken } = payload.data;
            setAccessTokenToLocalStorage(accessToken);
            setRefreshTokenToLocalStorage(refreshToken);
        } else if ('api/auth/token' === normalizeUrl) {
            const { accessToken, refreshToken } = payload;
            setAccessTokenToLocalStorage(accessToken);
            setRefreshTokenToLocalStorage(refreshToken);
        } else if (
            ['api/auth/logout', 'api/guest/auth/logout'].includes(normalizeUrl)
        ) {
            removeTokensFromLocalStorage();
        }
    }

    return data;
};

const https = {
    get(
        url,
        options
    ) {
        return request('GET', url, options)
    },
    post(
        url,
        body,
        options
    ) {
        return request('POST', url, { ...options, body })
    },
    put(
        url,
        body,
        options
    ) {
        return request('PUT', url, { ...options, body })
    },
    delete(
        url,
        options
    ) {
        return request('DELETE', url, { ...options })
    }
}

export default https;
