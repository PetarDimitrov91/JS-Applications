import {HomeView} from "./modules/HomeView.js";
import {DashboardView} from "./modules/DashboardView.js";
import {logout} from "./api/data.js";
import {CreateView} from "./modules/CreateView.js";
import {LoginView} from "./modules/LoginView.js";
import {RegisterView} from "./modules/RegisterView.js";

const homeSection = document.getElementById('home');
const registerSection = document.getElementById('register');
const loginSection = document.getElementById('login');
const dashboardSection = document.getElementById('dashboard-holder');
const ideaSection = document.getElementById('idea');
const createSection = document.getElementById('create-idea');

export {homeSection, registerSection, loginSection, dashboardSection, ideaSection, createSection, homeView,dashboardView};

document.getElementById('views').remove();

const homeView = new HomeView(homeSection);
homeView.showView();

const dashboardView = new DashboardView(dashboardSection);
const createView = new CreateView(createSection);
const loginView = new LoginView(loginSection);
const registerView = new RegisterView(registerSection);

const ids = {
    'icon': () => homeView.showView(),
    'dash': () => dashboardView.showView(),
    'create': () => createView.showView(),
    'sign-in': () => loginView.showView(),
    'sign-up': () => registerView.showView(),
}

document.getElementById('icon').addEventListener('click', (event) => {
    event.preventDefault();
    ids['icon']();
});

document.getElementById('navbarResponsive').addEventListener('click', (event) => {
    event.preventDefault();

    if (!ids[event.target.id]) {
        return;
    } else {
        ids[event.target.id]();
    }
});

document.getElementById('sign-out').addEventListener('click', async (event) => {
    event.preventDefault();
    await logout();
    homeView.showView();
});




