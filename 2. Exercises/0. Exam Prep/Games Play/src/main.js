import {page, render} from "./utils.js";
import {showHome} from "./modules/homeView.js";
import {getUserData, logout} from "./api/userSession.js";
import {showLogin} from "./modules/loginView.js";
import {showRegister} from "./modules/registerView.js";
import {showAllGames} from "./modules/allGamesView.js";
import {showCreate} from "./modules/createView.js";
import {showDetails} from "./modules/detailsView.js";
import {showEdit} from "./modules/editView.js";

const root = document.querySelector('#main-content');
const logoutBtn = document.querySelector('#logoutBtn');

updateNav();

logoutBtn.addEventListener('click', signOut);

async function signOut(event) {
    event.preventDefault();
    await logout();
    updateNav();
    page.redirect('/');
}

function updateNav() {
    const userData = getUserData();

    if (userData !== null) {
        document.querySelector('#user').style.display = 'block';
        document.querySelector('#guest').style.display = 'none';
    } else {
        document.querySelector('#user').style.display = 'none';
        document.querySelector('#guest').style.display = 'block';
    }
}

function decorateContext(ctx, next) {
    ctx.render = (temp) => render(temp, root);
    ctx.updateNav = updateNav;
    next();
}

page(decorateContext);
page('/', showHome);
page('/home', showHome);
page('/login', showLogin);
page('/register', showRegister);
page('/allGames', showAllGames);
page('/create', showCreate);
page('/details/:id', showDetails);
page('/edit/:id', showEdit);

page.start();