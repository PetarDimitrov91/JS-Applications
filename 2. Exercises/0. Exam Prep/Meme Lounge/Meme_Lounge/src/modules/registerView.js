import {html, page} from "../utils.js";
import {register} from "../api/userSession.js";
import {notify} from "../main.js";

const registerTemp = (onRegister) => html`
    section id="register">
    <form @submit=${onRegister} id="register-form">
        <div class="container">
            <h1>Register</h1>
            <label for="username">Username</label>
            <input id="username" type="text" placeholder="Enter Username" name="username">
            <label for="email">Email</label>
            <input id="email" type="text" placeholder="Enter Email" name="email">
            <label for="password">Password</label>
            <input id="password" type="password" placeholder="Enter Password" name="password">
            <label for="repeatPass">Repeat Password</label>
            <input id="repeatPass" type="password" placeholder="Repeat Password" name="repeatPass">
            <div class="gender">
                <input type="radio" name="gender" id="female" value="female">
                <label for="female">Female</label>
                <input type="radio" name="gender" id="male" value="male" checked>
                <label for="male">Male</label>
            </div>
            <input type="submit" class="registerbtn button" value="Register">
            <div class="container signin">
                <p>Already have an account?<a href="/login">Sign in</a>.</p>
            </div>
        </div>
    </form>
    </section>
`;


export function showRegister(ctx) {
    ctx.render(registerTemp(onRegister));

    async function onRegister(event) {
        event.preventDefault();

        const formData = new FormData(event.target);

        const username = formData.get('username').trim();
        const email = formData.get('email').trim();
        const password = formData.get('password').trim();
        const repass = formData.get('repeatPass').trim();
        const gender = formData.get('gender');


        if (!username || !email || !password || !repass) {
            notify('all fields are required!');
            return;
        }

        if (password !== repass) {
            notify('passwords don\'t match');
            return;
        }
        await register(username, email, password, gender);
        ctx.updateNav();

        page.redirect('/catalog');
    }
}