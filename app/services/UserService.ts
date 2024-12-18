import axios from 'axios'
import { API_URL} from '../constants/ApiUrl';

const api = axios.create({
    baseURL: API_URL
});

export const userAuth = (user:any) => {
    return api.post('/auth/signin', user);


}

