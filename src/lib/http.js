import envConfig, { defaultLocale } from "@/src/configs/config";
import { getAccessTokenFromLocalStorage, normalizePath } from "./utils";

export const ENTITY_ERROR_STATUS = 422
export const AUTHENTICATION_ERROR_STATUS = 401

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
        } else {
            throw new HttpError(data);
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
