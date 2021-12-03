import {html, page} from "../utils.js";
import {register} from "../api/userSession.js";

const registerTemp = (signUp) => html`
    <section id="register-page" class="register">
        <form @submit=${signUp} id="register-form" action="" method="">
            <fieldset>
                <legend>Register Form</legend>
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
                <p class="field">
                    <label for="repeat-pass">Repeat Password</label>
                    <span class="input">
                            <input type="password" name="confirm-pass" id="repeat-pass" placeholder="Repeat Password">
                        </span>
                </p>
                <input class="button submit" type="submit" value="Register">
            </fieldset>
        </form>
    </section>
`;

export function showRegister(ctx) {
    ctx.render(registerTemp((signUp)));

    async function signUp(event) {
        event.preventDefault();

        const formData = new FormData(event.target);

        const email = formData.get('email').trim();
        const password = formData.get('password').trim();
        const repass = formData.get('confirm-pass').trim();

        if (!email || !password || !repass) {
            alert('All fields are required');
            return;
        }

        if (password !== repass) {
            alert('passwords don\'t match');
            return;
        }

        await register(email, password);
        ctx.updateNav();
        page.redirect('/catalog');
    }
}