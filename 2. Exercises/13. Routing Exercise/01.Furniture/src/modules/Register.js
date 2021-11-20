import {View} from "./View.js";
import {html} from "../utils.js";

export class Register extends View{
    constructor(root) {
        super(root);
    }

    prepareView() {
        return () => html`
            <div class="container">
                <div class="row space-top">
                    <div class="col-md-12">
                        <h1>Register New User</h1>
                        <p>Please fill all fields.</p>
                    </div>
                </div>
                <form>
                    <div class="row space-top">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="form-control-label" for="email">Email</label>
                                <input class="form-control" id="email" type="text" name="email">
                            </div>
                            <div class="form-group">
                                <label class="form-control-label" for="password">Password</label>
                                <input class="form-control" id="password" type="password" name="password">
                            </div>
                            <div class="form-group">
                                <label class="form-control-label" for="rePass">Repeat</label>
                                <input class="form-control" id="rePass" type="password" name="rePass">
                            </div>
                            <input type="submit" class="btn btn-primary" value="Register" />
                        </div>
                    </div>
                </form>
            </div>
        `;
    }
}