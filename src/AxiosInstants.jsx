// api.js
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { notify } from './components';


const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
});

// Add request interceptor
api.interceptors.request.use(
    async config => {
        let token = localStorage.getItem('accessToken');
        if (token) {
            try {
                const { exp } = jwtDecode(token);
                if (exp < Date.now() / 1000 && config.url !== 'auth/refresh-token') {
                    // 
                }
            } catch (err) {
                console.log(err);
            }
            console.log('Final Request Config:', config.url);
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        const statusCode = error?.response?.status;
        // console.error("Axios request error:", error?.response);
        // const currentPath = window.location.pathname.replace(/\/$/, "");
        // if (statusCode === 503 && currentPath !== "/maintenance") {
        //     window.location.replace("/maintenance");
        // }
        if (statusCode === 401) {
            // localStorage.clear()
            // window.location.replace("/login");
            // notify("Un Authorized Request")
        }

        return Promise.reject(error);
    }
);

// Add response interceptor
api.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            console.log(error);
            localStorage.clear()
            notify("Un Authorized Request")
            window.location.replace("/login");

        }
        return Promise.reject(error);
    }
);

export { api };