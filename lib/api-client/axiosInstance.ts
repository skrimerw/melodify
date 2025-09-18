import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: (() => {
    //console.log(process.env.NEXT_API_URL);
    return '/api';
  })(),
});
