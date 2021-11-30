import {html, page} from "../utils.js";
import {login} from "../api/userSession.js";
import {notify} from "../main.js";

const loginTemp = (onSubmit) => html`
    <section id="login">
        <form @submit=${onSubmit} id="login-form">
            <div class="container">
                <h1>Login</h1>
                <label for="email">Email</label>
                <input id="email" placeholder="Enter Email" name="email" type="text">
                <label for="password">Password</label>
                <input id="password" type="password" placeholder="Enter Password" name="password">
                <input type="submit" class="registerbtn button" value="Login">
                <div class="container signin">
                    <p>Dont have an account?<a href="/register">Sign up</a>.</p>
                </div>
            </div>
        </form>
    </section>
`;


export function showLogin(ctx) {
    ctx.render(loginTemp(onLogin));

    async function onLogin(event) {
        event.preventDefault();

        const formData = new FormData(event.target);

        const email = formData.get('email').trim();
        const password = formData.get('password').trim();

        if (!email || !password) {
            notify('Email or password don\'t match');
            return;
        }

        await login(email, password);
        ctx.updateNav();

        page.redirect('/catalog');
    }
}