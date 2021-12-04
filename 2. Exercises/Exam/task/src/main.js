import {getUserData, logout} from "./api/userSession.js";
import {page, render} from "./utils.js";
import {showHome} from "./modules/homeView.js";
import {showRegister} from "./modules/registerView.js";
import {showLogin} from "./modules/loginView.js";

const root = document.querySelector('#main-content');
const logoutBtn = document.querySelector('#logoutBtn');

logoutBtn.addEventListener('click', signOut);

updateNav();

page(decorateContext);
page('/', showHome);
page('/home', showHome);
page('/login', showLogin);
page('/register', showRegister);

page.start();


function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, root);
    ctx.updateNav = updateNav;
    next();
}

async function signOut() {
    await logout();
    updateNav();
}

function updateNav() {
    const userData = getUserData();
    if (userData !== null) {
        document.querySelector('#userCrate').style.display = 'inline-block';
        document.querySelector('#userLogout').style.display = 'inline-block';
        document.querySelector('#guestLogin').style.display = 'none';
        document.querySelector('#guestRegister').style.display = 'none';
    } else {
        document.querySelector('#userCrate').style.display = 'none';
        document.querySelector('#userLogout').style.display = 'none';
        document.querySelector('#guestLogin').style.display = 'inline-block';
        document.querySelector('#guestRegister').style.display = 'inline-block';
    }
}

/*
const root = document.querySelector('#site-content');
const logoutBtn = document.querySelector('#logoutBtn');
logoutBtn.addEventListener('click', signOut);

updateNav();

page(decorateContext);
page('/', showCatalog);
page('/catalog', showCatalog);
page('/login', showLogin);
page('/register', showRegister);
page('/create', showCreate);
page('/details/:id', showDetails);
page('/edit/:id', showEdit);
page('/my-books', showMyBooks);

page.start();

function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, root);
    ctx.updateNav = updateNav;
    next();
}

function updateNav() {
    const userData = getUserData();
    if (userData !== null) {
        document.querySelector('#user').style.display = 'block';
        document.querySelector('#guest').style.display = 'none';
        document.querySelector('#greeting').textContent = `Welcome, ${userData.email}`;
    } else {
        document.querySelector('#user').style.display = 'none';
        document.querySelector('#guest').style.display = 'block';
        document.querySelector('#greeting').textContent = ``;
    }
}

async function signOut() {
    await logout();
    updateNav();
}

*/