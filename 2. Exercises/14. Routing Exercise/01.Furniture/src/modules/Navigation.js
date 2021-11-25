import {View} from "./View.js";
import {html, page, render, until} from "../utils.js";
import {logout} from "../api/userSession.js";
import {getSearchedItem} from "../api/data.js";

export class Navigation extends View {
    constructor(root) {
        super(root);

        this.prepareView(root);
    }

    prepareView(root) {
        const navTemp = () => html`
            <header>
                <h1><a href="/" id="shopName">Furniture Store</a></h1>
                <form @submit=${this.showResults.bind(this)} id="search-field">
                    <input type="search" name="search" class="search">
                    <input type="submit" class="searchBtn" value="Search"/>
                </form>
                <nav>
                    <a id="catalogLink" href="/catalog" class="active">Dashboard</a>
                    <div id="user">
                        <a id="createLink" href="/create">Create Furniture</a>
                        <a id="profileLink" href="/my-furniture">My Publications</a>
                        <a @click=${this.signOut} id="logoutBtn" href="javascript:void(0)">Logout</a>
                    </div>
                    <div id="guest">
                        <a id="loginLink" href="/login">Login</a>
                        <a id="registerLink" href="/register">Register</a>
                    </div>
                </nav>
            </header>
            <main>
            </main>`;

        this.attachView(root, navTemp());
    }

    attachView(root, temp) {
        render(temp, root);
    }

    async signOut() {
        await logout();
        page.redirect('/');
    }

    async showResults(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const make = formData.get('search')
        event.target.reset();

        const searchedItems = this.loadSearchedItem(make);

        const temp = () => html`
            <div class="container">
                <div class="row space-top">
                    <div class="col-md-12">
                        <h1>Welcome to Furniture System</h1>
                        <p>Select furniture from the catalog to view details.</p>
                    </div>
                </div>
                <div class="row space-top">
                    ${until(searchedItems, html`<p>Loading &hellip;</p>`)}
                </div>
            </div>\`;
        `;

        render(temp(), document.querySelector('main'));
    }

    async loadSearchedItem(make) {
        const items = await getSearchedItem(make);

        const itemTemp = () => html`
            ${items.map(item => html`
                <div class="col-md-4">
                    <div class="card text-white bg-primary">
                        <div class="card-body">
                            <img src=${item.img}/>
                            <p>${item.description}</p>
                            <footer>
                                <p>Price: <span>${item.price} $</span></p>
                            </footer>
                            <div>
                                <a href=${`/details/${item._id}`} class="btn btn-info">Details</a>
                            </div>
                        </div>
                    </div>
                </div>`)}`;

        return itemTemp();
    }

    static updateNav() {
        const userData = JSON.parse(sessionStorage.getItem('userData'));

        if (userData === null) {
            document.querySelector('#user').style.display = 'none';
            document.querySelector('#guest').style.display = 'inline-block';
        } else {
            document.querySelector('#user').style.display = 'inline-block';
            document.querySelector('#guest').style.display = 'none';
        }
    }
}