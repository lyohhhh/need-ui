import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { getAccessToken } from './auth';

const request: AxiosInstance = axios.create({
	baseURL: 'http://192.168.10.171:3000/',
	timeout: 20000,
});

const errFunc = (err: AxiosError): Promise<AxiosError> => {
	if (err.response) {
		const { data, status } = err.response;
		if (status == 401) {
			console.log(`请重新登录`);
		}
		return Promise.reject(data);
	}
	return Promise.reject(err);
};

request.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig => {
	const token = getAccessToken();

	if (token) {
		config.headers && (config.headers['Authorization'] = `Bearer ${token}`);
	}
	return config;
}, errFunc);

request.interceptors.response.use((rep: AxiosResponse<HttpResponse>) => {
	return rep;
}, errFunc);

export default request;
