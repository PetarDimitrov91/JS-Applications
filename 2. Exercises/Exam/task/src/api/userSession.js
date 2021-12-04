import {get, post} from "./api.js";

export function setUserData(userData) {
    return sessionStorage.setItem('userData', JSON.stringify(userData));
}

export function clearUserData() {
    return sessionStorage.removeItem('userData');
}

export function getUserData() {
    return JSON.parse(sessionStorage.getItem('userData'));
}

export async function login(email, password) {
    const result = await post('/users/login', {email, password})

    const userData = {
        email: result.email,
        id: result._id,
        token: result.accessToken
    };

    setUserData(userData);
}

export async function register(email, password) {
    const result = await post('/users/register', {email, password});

    const userData = {
        email: result.email,
        id: result._id,
        token: result.accessToken
    };

    setUserData(userData);
}

export async function logout() {
    get('/users/logout');
    clearUserData();
}