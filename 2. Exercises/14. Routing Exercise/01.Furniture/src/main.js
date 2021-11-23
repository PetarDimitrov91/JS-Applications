import {Navigation} from "./modules/Navigation.js";
import {page, render} from './utils.js';
import {Catalog} from "./modules/Catalog.js";
import {Create} from "./modules/Create.js";
import {MyFurniture} from "./modules/MyFurniture.js";
import {Details} from "./modules/Details.js";
import {Edit} from "./modules/Edit.js";
import {Register} from "./modules/Register.js";
import {Login} from "./modules/Login.js";

const nav = new Navigation(document.body);

const root = document.querySelector('main');

const catalogView = new Catalog(root);
const createView = new Create(root);
const myFurnitureView = new MyFurniture(root);
const registerView = new Register(root);
const loginView = new Login(root)
const detailsView = new Details(root);
const editView = new Edit(root);

page(decorateContext);
page('/', catalogView.showView.bind(catalogView));
page('/catalog', catalogView.showView.bind(catalogView));
page('/create', createView.showView.bind(createView));
page('/my-furniture', myFurnitureView.showView.bind(myFurnitureView));
page('/register', registerView.showView.bind(registerView));
page('/login', loginView.showView.bind(loginView));
page('/details/:id', detailsView.showView.bind(detailsView));
page('/edit/:id', editView.showView.bind(editView));
page.start();

function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, root);
    next();
}

