import axios, {AxiosInstance} from 'axios';

// Accede a la variable de entorno
const baseURL = import.meta.env.VITE_API_BASE_URL;

const eventApi: AxiosInstance = axios.create({
    baseURL: baseURL,
});

export {
    eventApi,
}