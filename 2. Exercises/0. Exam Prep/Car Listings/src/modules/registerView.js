import {html, page} from "../utils.js";
import {register} from "../api/userSession.js";

const temp = (onSubmit) => html`
    <section id="register">
        <div class="container">
            <form @submit=${onSubmit} id="register-form">
                <h1>Register</h1>
                <p>Please fill in this form to create an account.</p>
                <hr>

                <p>Username</p>
                <input type="text" placeholder="Enter Username" name="username" required>

                <p>Password</p>
                <input type="password" placeholder="Enter Password" name="password" required>

                <p>Repeat Password</p>
                <input type="password" placeholder="Repeat Password" name="repeatPass" required>
                <hr>

                <input type="submit" class="registerbtn" value="Register">
            </form>
            <div class="signin">
                <p>Already have an account?
                    <a href="/login">Sign in</a>.
                </p>
            </div>
        </div>
    </section>
`;

export function signUp(ctx) {
    ctx.render(temp(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);

        const username = formData.get('username').trim();
        const password = formData.get('password').trim();
        const repeatPass = formData.get('repeatPass').trim();

        if (!username || !password) {
            alert('Please fill all fields!');
            return;
        }

        if (password !== repeatPass) {
            alert('Please fill all fields!');
            return;
        }

        await register(username, password);
        ctx.updateUserNav();
        page.redirect('/home');
    }
}