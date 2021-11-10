import {loadHomePage} from "./home.js";
import {onLogin} from "./login.js";
import {onRegister} from "./register.js";


const homeRedirection = document.getElementById('home-redirection');
const logout = document.getElementById('logout');
const login = document.getElementById('login');
const register = document.getElementById('register');

export function addNavListeners() {
    homeRedirection.addEventListener('click', () => {
        loadHomePage();
    });

    logout.addEventListener('click', () => {
        //TODO LOGOUT
        console.log('logout')
    });

    login.addEventListener('click', onLogin )

    register.addEventListener('click',onRegister)
}