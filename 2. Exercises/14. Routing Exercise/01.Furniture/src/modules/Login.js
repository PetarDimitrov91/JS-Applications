import {View} from "./View.js";
import {html, page, render} from "../utils.js";
import {login} from "../api/userSession.js";


export class Login extends View {
    constructor(root) {
        super(root);
    }

    prepareView() {
        const temp = (err) => html`
            <div class="container">
                <div class="row space-top">
                    <div class="col-md-12">
                        <h1>Login User</h1>
                        <p>Please fill all fields.</p>
                    </div>
                </div>
                <form @submit=${this.signIn.bind(null, this.root, temp)}>
                    <div class="row space-top">
                        <div class="col-md-4">
                            ${err ? html`
                                <div class="form-group err">${err}</div>` : null}
                            <div class="form-group">
                                <label class="form-control-label" for="email">Email</label>
                                <input class=${'form-control' + (err ? ' is-invalid' : '')} id="email" type="text"
                                       name="email">
                            </div>
                            <div class="form-group">
                                <label class="form-control-label" for="password">Password</label>
                                <input class=${'form-control' + (err ? ' is-invalid' : '')} id="password"
                                       type="password" name="password">
                            </div>
                            <input type="submit" class="btn btn-primary" value="Login"/>
                        </div>
                    </div>
                </form>
            </div>
        `;
        return temp;
    }

    async signIn(root, temp, event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const email = formData.get('email').trim();
        const password = formData.get('password').trim();

        if (!email || !password) {
            render(temp('All fields are required'), root);
            return;
        }

        try {
            await login(email, password);
        } catch (e) {
            render(temp(e.message), root);
            return;
        }
        event.target.reset();

        page.redirect('/my-furniture');
    }
}