import {post,get} from "./api.js";

async function login(email, password) {
    const result = await post('/users/login', {email, password});

    const userData = {
        email: result['email'],
        id: result['_id'],
        token: result['accessToken']
    };
    sessionStorage.setItem('userData', JSON.stringify(userData));
}

async function register(email, password) {

    const result = await post('/users/register', {email, password});

    const userData = {
        email: result['email'],
        id: result['_id'],
        token: result['accessToken']
    }
    sessionStorage.setItem('userData', JSON.stringify(userData));
}

async function logout() {
    //remove await for the exam
    await get('/users/logout');
    sessionStorage.removeItem('userData');
}

export {login, register, logout};