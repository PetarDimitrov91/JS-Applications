import {getUserData, logout} from "./api/userSession.js";
import {page, render} from "./utils.js";
import {showHome} from "./modules/homeView.js";
import {showRegister} from "./modules/registerView.js";
import {showLogin} from "./modules/loginView.js";
import {showCatalog} from "./modules/catalogView.js";
import {showCreate} from "./modules/createView.js";
import {showDetails} from "./modules/detailsView.js";
import {showEdit} from "./modules/editView.js";
import {showSearch} from "./modules/searchView.js";

const root = document.querySelector('#main-content');
const logoutBtn = document.querySelector('#logoutBtn');

logoutBtn.addEventListener('click', signOut);

updateNav();

page(decorateContext);
page('/', showHome);
page('/home', showHome);
page('/login', showLogin);
page('/register', showRegister);
page('/catalog', showCatalog);
page('/create', showCreate);
page('/details/:id', showDetails);
page('/edit/:id', showEdit);
page('/search', showSearch);

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
        document.querySelectorAll('.user').forEach(e => e.style.display = 'inline-block');
        document.querySelectorAll('.guest').forEach(e => e.style.display = 'none');
    } else {
        document.querySelectorAll('.user').forEach(e => e.style.display = 'none');
        document.querySelectorAll('.guest').forEach(e => e.style.display = 'inline-block');
    }
}

