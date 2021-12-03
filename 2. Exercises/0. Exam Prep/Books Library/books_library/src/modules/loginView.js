import {html, page} from "../utils.js";
import {login} from "../api/userSession.js";

const loginTemp = (signIn) => html`
    <section id="login-page" class="login">
        <form @submit=${signIn} id="login-form" action="" method="">
            <fieldset>
                <legend>Login Form</legend>
                <p class="field">
                    <label for="email">Email</label>
                    <span class="input">
                            <input type="text" name="email" id="email" placeholder="Email">
                        </span>
                </p>
                <p class="field">
                    <label for="password">Password</label>
                    <span class="input">
                            <input type="password" name="password" id="password" placeholder="Password">
                        </span>
                </p>
                <input class="button submit" type="submit" value="Login">
            </fieldset>
        </form>
    </section>
`;

export function showLogin(ctx) {
    ctx.render(loginTemp((signIn)));

    async function signIn(event) {
        event.preventDefault();

        const formData = new FormData(event.target);

        const email = formData.get('email').trim();
        const password = formData.get('password').trim();

        if (!email || !password) {
            alert('All fields are required');
            return;
        }

        await login(email, password);
        ctx.updateNav();
        page.redirect('/catalog');
    }
}