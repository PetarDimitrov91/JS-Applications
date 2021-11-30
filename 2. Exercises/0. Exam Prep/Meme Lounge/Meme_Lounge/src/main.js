import {page, render} from './utils.js';
import {getUserData, logout} from "./api/userSession.js";
import {showHome} from "./modules/homeView.js";
import {showLogin} from "./modules/loginView.js";
import {showRegister} from "./modules/registerView.js";
import {showCatalog} from "./modules/calatog.js";
import {showCreate} from "./modules/createView.js";
import {showDetails} from "./modules/detailsView.js";
import {showEdit} from "./modules/editView.js";
import {showMyProfile} from "./modules/myProfileView.js";

const root = document.querySelector('main');
const logoutBtn = document.querySelector('#logoutBtn');
const notification = document.querySelector('#errorBox');
logoutBtn.addEventListener('click', signOut);

export function notify(message) {
    notification.querySelector('span').textContent = message;
    notification.style.display = 'block';
    setTimeout(() => notification.style.display = 'none',3000);
}

updateNav();

page(decorateContext);
page('/', showHome);
page('/home', showHome);
page('/login', showLogin);
page('/register', showRegister)
page('/catalog', showCatalog);
page('/create', showCreate);
page('/details/:id', showDetails);
page('/edit/:id', showEdit);
page('/my-profile', showMyProfile);

page.start();

function decorateContext(ctx, next) {
    ctx.render = (temp) => render(temp, root);
    ctx.updateNav = updateNav;
    next();
}

async function signOut(event) {
    event.preventDefault();
    await logout();
    updateNav();
    page.redirect('/home');
}

function updateNav() {

    const userData = getUserData();

    if (userData !== null) {
        document.querySelector('.profile span').textContent = 'Welcome, ' + userData.email;
        document.querySelector('.user').style.display = 'block';
        document.querySelector('.guest').style.display = 'none';

        page.redirect('/catalog');
    } else {
        document.querySelector('.profile span').textContent = '';
        document.querySelector('.user').style.display = 'none';
        document.querySelector('.guest').style.display = 'block';
        page.redirect('/');
    }
}