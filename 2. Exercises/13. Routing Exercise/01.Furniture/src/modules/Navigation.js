import {View} from "./View.js";
import {html, render} from "../utils.js";


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
                        <a id="logoutBtn" href="javascript:void(0)">Logout</a>
                    </div>
                    <div id="guest">
                        <a id="loginLink" href="/login">Login</a>
                        <a id="registerLink" href="/register">Register</a>
                    </div>
                </nav>
            </header>
            <main>
            </main>
        `;

        this.attachView(root, navTemp());
    }

    attachView(root,temp) {
        render(temp,root);
    }
}