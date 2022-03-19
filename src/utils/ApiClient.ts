import axios, { AxiosInstance, AxiosResponse}  from 'axios';

export interface ServerError {
	code: number;
	message: string;
}

export type Response<T> = AxiosResponse<T>;

export type ResponseError = AxiosResponse<ServerError>;

const baseURL = process.env.REACT_APP_BASE_URL as string;

const clientAPI: AxiosInstance = axios.create({
    baseURL,
    responseType: 'json'
    ,
    headers: {
        'Content-Type': 'application/json',
    },
});

class ApiClient {
	get<T = any, U = any>(url: string, params?: any, headers?: any): Promise<Response<U>> {
		return this.invoke(clientAPI.get, url, { params, headers });
	}

	post<T = any, U = any>(url: string, data?: any, headers?: any): Promise<Response<U>> {
		return this.invoke(clientAPI.post, url, data, { headers });
	}

	put<T = any, U = any>(url: string, data: T, headers?: any): Promise<Response<U>> {
		return this.invoke(clientAPI.put, url, data, { headers });
	}

	delete<T, U>(url: string, data?: T, headers?: any): Promise<Response<U>> {
		return this.invoke(clientAPI.delete, url, { data: data, headers });
	}

	invoke<T, U>(action: Function, ...args: any): Promise<Response<U>> {
		return action(...args);
	}

}

export default new ApiClient();
