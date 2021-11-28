import {page, render} from './utils.js'
import {showHome} from "./modules/homeView.js";
import {signIn} from "./modules/loginView.js";
import {signUp} from "./modules/registerView.js";
import {getUserData, logout} from "./api/userSession.js";
import {showListings} from "./modules/allListingsView.js";
import {showCreate} from "./modules/createView.js";
import {showDetails} from "./modules/detailsView.js";
import {showEditCar} from "./modules/editView.js";
import {showMyListings} from "./modules/myListingsView.js";
import {showSearch} from "./modules/searchView.js";

const root = document.querySelector('#site-content');
const logoutBtn = document.querySelector('#logoutBtn');

updateUserNav();

logoutBtn.addEventListener('click', signOut);

async function signOut(event) {
    event.preventDefault();
    await logout();
    updateUserNav();
    page.redirect('/');
}

function updateUserNav() {
    const userData = getUserData();
    if (userData !== null) {
        document.querySelector('#guest').style.display = 'none';
        document.querySelector('#profile').style.display = 'block';
        document.querySelector('#greeting').textContent = 'Welcome ' + userData.username;
    } else {
        document.querySelector('#guest').style.display = 'block';
        document.querySelector('#profile').style.display = 'none';
        document.querySelector('#greeting').textContent = 'Welcome username';
    }
}

function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, root);
    ctx.updateUserNav = updateUserNav;
    next();
}

page(decorateContext);
page('/', showHome);
page('/home', showHome);
page('/login', signIn);
page('/register', signUp)
page('/allListings', showListings)
page('/create', showCreate);
page('/details/:id', showDetails);
page('/edit/:id', showEditCar);
page('/myListings', showMyListings);
page('/search', showSearch);

page.start();