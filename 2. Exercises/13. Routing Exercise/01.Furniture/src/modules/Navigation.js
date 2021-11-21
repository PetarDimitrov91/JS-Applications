import {View} from "./View.js";
import {html, page, render} from "../utils.js";
import {logout} from "../api/userSession.js";

export class Navigation extends View {
    constructor(root) {
        super(root);
        this.prepareView(root);
    }

    prepareView(root) {
        const navTemp = () => html`
            <header>
                <h1><a href="/">Furniture Store</a></h1>
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