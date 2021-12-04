import {getUserData, logout} from "./api/userSession.js";
import {page, render} from "./utils.js";

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

/*