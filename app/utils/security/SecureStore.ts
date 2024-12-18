import * as secureStore from 'expo-secure-store'

const setToken = async (token: string) => {
    await secureStore.setItem('access_token', token);
}

const getToken = async () => {
    return await secureStore.getItem('access_token');
}

const setUser = async (user: any) => {
    await secureStore.setItem('user', user);
}

const getUser = async () => {
    return await secureStore.getItem('user');
}

export {setToken , getToken, setUser, getUser};