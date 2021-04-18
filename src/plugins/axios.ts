import axiosInstance from '../utills/customHooks/intrerceptor';

export function PostRequest(url: string, data: any, config: any) {
    return axiosInstance.post(url, data, config);
}

export function PutRequest(url: string, data: any, config: any) {
    return axiosInstance.put(url, data, config);
}

export function DeleteRequest(url:string, data:any) {
    return axiosInstance.delete(url,data);
}

export function GetRequestByParams(url: string, data: any, config: any ){
    config.params = data;
    return axiosInstance.get(url, config);
}

export function GetRequest(url:string, data: any){
    return axiosInstance.get(url,data)
}