import axios from 'axios'
import { API_URL } from '../constants/ApiUrl';
import { getToken } from '../utils/security/SecureStore';

let bearerToken = getToken();


const api = axios.create({
    baseURL: API_URL
});

// Interceptor para agregar el token a todas las peticiones
api.interceptors.request.use(
    config => {
      if (bearerToken) {
        config.headers.Authorization = `Bearer ${bearerToken}`;
      }
      return config;
    },
    error => Promise.reject(error)
  );




export const sendBitacoraSuelo = (bitacora:any) => {
    return api.post('/api/loadmovil/create', bitacora);
};

export const getAsignacion = (id: number) => {
    return api.get(`/api/asignacion/find/${id}`);
}