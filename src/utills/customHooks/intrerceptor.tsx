import axios from 'axios';
import promise from 'promise';

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
    config => {
        const accessToken = localStorage.getItem("token");
        if (accessToken) {
            config.headers.authorization = "Bearer " + accessToken;
        }
        return config;
    },
    error => {
        if (error.response && error.response.status === 401) {
            console.log("An error occurred while logging in to the application.");
        } else {
            return promise.reject(error);
        }
    }
);

axiosInstance.interceptors.response.use((response) => {
        return response
    }, error => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken: string = localStorage.getItem('refreshToken') || '';
            const user: string = localStorage.getItem('user') || '';
            let email: string;
            if (refreshToken.length === 0 && user.length === 0) {
                return Promise.reject(error);
            }
            email = JSON.parse(user).email;
            return axiosInstance.post('http://localhost:8080/api/users/refresh-token',
                {
                    "email": `${email}`,
                    "refreshToken": `${refreshToken}`
                }).then(res => {
                if (res.status === 200) {
                    localStorage.setItem('token', res.data.token)
                    const accessToken = localStorage.getItem("token");
                    originalRequest.headers.authorization = 'Bearer ' + accessToken;
                    return axios(originalRequest)
                }
            })
        }
    }
);

export default axiosInstance;