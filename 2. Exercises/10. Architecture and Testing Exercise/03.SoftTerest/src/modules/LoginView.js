import {View} from "./View.js";
import {login} from "../api/data.js";
import {homeView} from "../main.js";

export class LoginView extends View {
    constructor(section) {
        super(section);
    }

    showView() {
        super.showView();

        const form = this.section.querySelector('form');
        form.addEventListener('submit', singIn);

        async function singIn(event) {
            event.preventDefault();

            const formData = new FormData(form);

            const email = formData.get('email').trim();
            const password = formData.get('password').trim();

            if (!email || !password) {
                alert('all fields are required');
                form.reset();
                return;
            }

            await login(email, password);
            form.reset();
            homeView.showView();
        }
    }
}