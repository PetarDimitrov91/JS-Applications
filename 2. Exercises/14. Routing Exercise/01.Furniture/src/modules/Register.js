import {View} from "./View.js";
import {html, page, render} from "../utils.js";
import {register} from "../api/userSession.js";

export class Register extends View {
    constructor(root) {
        super(root);
    }

    prepareView() {
        const temp = (err) => html`
            <div class="container">
                <div class="row space-top">
                    <div class="col-md-12">
                        <h1>Register New User</h1>
                        <p>Please fill all fields.</p>
                    </div>
                </div>
                <form @submit=${this.signUp.bind(null, this.root, temp)}>
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
                            <div class="form-group">
                                <label class="form-control-label" for="rePass">Repeat</label>
                                <input class=${'form-control' + (err ? ' is-invalid' : '')} id="rePass"
                                       type="password" name="rePass">
                            </div>
                            <input type="submit" class="btn btn-primary" value="Register"/>
                        </div>
                    </div>
                </form>
            </div>`;
        return temp;
    }

    async signUp(root, temp, event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const email = formData.get('email').trim();
        const password = formData.get('password').trim();
        const rePass = formData.get('rePass').trim();

        if (!email || !password || !rePass) {
            render(temp('All fields are required'), root);
            return;
        }

        if (password !== rePass) {
            render(temp('passwords don\'t match'), root);
            return;
        }

        await register(email, password);

        event.target.reset();
        page.redirect('/');
    }
}