import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: (() => {
        return "/api";
    })(),
});
