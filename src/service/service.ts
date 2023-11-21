import axios from "axios";

export const apiService = axios.create({
    baseURL: "http://localhost:9090/v1/",
    timeout: 1000,
});
