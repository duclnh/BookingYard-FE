import { getTokenWorkAround } from "@services/authService";

const baseUrl = process.env.NEXT_PUBLIC_API_URL

async function get(url: string) {
    const requestOptions = {
        method: 'GET',
        headers: await getHeader()
    }
    const response = await fetch(baseUrl + url, requestOptions);
    return await handleResponse(response);
}

async function post(url: string, body: {}, formData?: FormData) {
    let requestOptions: RequestInit;

    if (formData) {
        requestOptions = {
            method: 'POST',
            headers: await getHeader(true),
            body: formData
        };
    } else {
        requestOptions = {
            method: 'POST',
            headers: await getHeader(),
            body: JSON.stringify(body)
        };
    }
    const response = await fetch(baseUrl + url, requestOptions);
    return await handleResponse(response);
}

async function put(url: string, body: {}, formData?: FormData) {
    let requestOptions: RequestInit;
    if (formData) {
        requestOptions = {
            method: 'PUT',
            headers: await getHeader(true),
            body: formData
        };
    } else {
        requestOptions = {
            method: 'PUT',
            headers: await getHeader(),
            body: JSON.stringify(body)
        };
    }
    const response = await fetch(baseUrl + url, requestOptions);
    return await handleResponse(response);
}

async function del(url: string, body: {}) {
    const requestOptions = {
        method: 'DELETE',
        headers: await getHeader(),
        body: JSON.stringify(body),
    }
    const response = await fetch(baseUrl + url, requestOptions);
    return await handleResponse(response);
}
async function getHeader(multiple?: boolean) {
    const token = await getTokenWorkAround();
    let headers = { 'Content-Type': 'application/json' } as any;
    if (multiple) {
        headers = {} as any;
    }
    if (token) {
        headers.Authorization = 'Bearer ' + token.token
    }
    return headers;
}

async function handleResponse(response: Response) {
    const text = await response.text();
    let data;
    try {
        data = JSON.parse(text)
    } catch {
        data = text
    }
    const res = {
        status: response.status,
        data: data,
    }
    return res;
}

export const fetchWrapper = {
    get,
    post,
    put,
    del,
}