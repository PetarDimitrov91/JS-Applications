import {html,page} from "../utils.js";
import {login} from "../api/userSession.js";

const loginTemp = (onLogin) => html`
    <section id="login-page" class="auth">
        <form @submit=${onLogin} id="login">

            <div class="container">
                <div class="brand-logo"></div>
                <h1>Login</h1>
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" placeholder="Sokka@gmail.com">

                <label for="login-pass">Password:</label>
                <input type="password" id="login-password" name="password">
                <input type="submit" class="btn submit" value="Login">
                <p class="field">
                    <span>If you don't have profile click <a href="/register">here</a></span>
                </p>
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
            alert('all fields are required!');
            return;
        }
        await login(email, password);
        ctx.updateNav();

        page.redirect('/home');
    }
}