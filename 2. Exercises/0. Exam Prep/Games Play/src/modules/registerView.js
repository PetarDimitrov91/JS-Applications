import {html, page} from "../utils.js";
import {register} from "../api/userSession.js";

const regTemp = (onRegister) => html`
    <section id="register-page" class="content auth">
        <form @submit=${onRegister} id="register">
            <div class="container">
                <div class="brand-logo"></div>
                <h1>Register</h1>

                <label for="email">Email:</label>
                <input type="email" id="email" name="email" placeholder="maria@email.com">

                <label for="pass">Password:</label>
                <input type="password" name="password" id="register-password">

                <label for="con-pass">Confirm Password:</label>
                <input type="password" name="confirm-password" id="confirm-password">

                <input class="btn submit" type="submit" value="Register">

                <p class="field">
                    <span>If you already have profile click <a href="/login">here</a></span>
                </p>
            </div>
        </form>
    </section>
`;

export function showRegister(ctx) {
    ctx.render(regTemp(onRegister));

    async function onRegister(event) {
        event.preventDefault();

        const formData = new FormData(event.target);

        const email = formData.get('email').trim();
        const password = formData.get('password').trim();
        const repass = formData.get('confirm-password').trim();

        if (!email || !password || !repass) {
            alert('all fields are required!');
            return;
        }

        if (password !== repass) {
            alert('passwords don\'t match');
            return;
        }
        await register(email, password);
        ctx.updateNav();

        page.redirect('/home');
    }
}