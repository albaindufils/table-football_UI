import axios, {AxiosRequestConfig} from "axios";
import {API_URL, REQUEST_TIMEOUT} from "../commons/constants";


const config: AxiosRequestConfig = {
    baseURL: API_URL,
    timeout: REQUEST_TIMEOUT
}

export const AxiosService = axios.create(config);
