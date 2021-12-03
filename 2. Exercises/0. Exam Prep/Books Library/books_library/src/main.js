import {getUserData, logout} from "./api/userSession.js";
import {page, render} from "./utils.js";
import {showCatalog} from "./modules/catalogView.js";
import {showLogin} from "./modules/loginView.js";
import {showRegister} from "./modules/registerView.js";
import {showDetails} from "./modules/detailsView.js";
import {showCreate} from "./modules/createView.js";
import {showEdit} from "./modules/editView.js";
import {showMyBooks} from "./modules/my-booksView.js";

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