import {postRequest, showView} from "../main/functions.js";
import {loginSection} from "../main/main.js";
import {loadHomePage} from "./home.js";
import {LOGIN_URL} from "./constants.js";

export async function onLogin() {
    showView(loginSection)
   document.addEventListener('submit', logOn);
}

async function logOn(event){
    event.preventDefault();
    const form = loginSection.querySelector('form');
    const formData = new FormData(form);

    const email = formData.get('email');
    const password = formData.get('password');

    const data = await postRequest(LOGIN_URL, {email,password})
    if (data === null) {
        alert('Error in Login');
        return;
    }

    const userData = {
        email: data['email'],
        id: data['_id'],
        token: data['accessToken']
    }

    sessionStorage.setItem('userData', JSON.stringify(userData));
    await loadHomePage()
}

