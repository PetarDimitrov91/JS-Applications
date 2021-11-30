import {post, get} from "./api.js";

async function login(email, password) {
    const result = await post('/users/login', {email, password});

    const userData = {
        username: result['username'],
        email: result['email'],
        gender: result['gender'],
        id: result['_id'],
        token: result['accessToken']
    };

    setUserData(userData);
}

async function register(username, email, password, gender) {
    const result = await post('/users/register', {username, email, password, gender});

    const userData = {
        username: result['username'],
        email: result['email'],
        gender: result['gender'],
        id: result['_id'],
        token: result['accessToken']
    };

    setUserData(userData);
}

async function logout() {
    //remove await for the exam
    get('/users/logout');
    clearUserData();
}

function setUserData(userData) {
    sessionStorage.setItem('userData', JSON.stringify(userData));
}

function clearUserData() {
    sessionStorage.removeItem('userData');
}

function getUserData() {
    return JSON.parse(sessionStorage.getItem('userData'));
}

export {login, register, logout, setUserData, clearUserData, getUserData};
