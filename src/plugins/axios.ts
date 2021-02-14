import axios from '../utills/customHooks/intrerceptor';

export function PostRequest(url: string, data: any, config: any) {
    return axios.post(url, data, config);
}

export function PutRequest(url: string, data: any, config: any) {
    return axios.put(url, data, config);
}

export function GetRequest(url: string, data: any, config: any ){
    config.params = data;
    return axios.get(url, config);
}