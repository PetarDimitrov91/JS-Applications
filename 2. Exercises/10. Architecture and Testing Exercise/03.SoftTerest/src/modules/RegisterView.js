import {View} from "./View.js";
import {register} from "../api/data.js";
import {homeView} from "../main.js";

export class RegisterView extends View {
    constructor(section) {
        super(section);
    }

    showView() {
        super.showView();

        const form = this.section.querySelector('form');
        form.reset();
        form.addEventListener('submit', singUp);

        async function singUp(event) {
            event.preventDefault();

            const formData = new FormData(form);

            const email = formData.get('email').trim();
            const password = formData.get('password').trim();
            const rePass = formData.get('repeatPassword').trim();

            if (!email || !password || !rePass) {
                alert('all fields are required');
                form.reset();
                return;
            }

            if (password !== rePass) {
                alert('password don\'t match');
                form.reset();
                return;
            }

            if (!email.includes('@') || !email.includes('.'))
            {
                alert('please enter a valid email');
                form.reset();
                return;
            }

            if (password.length < 3) {
                alert('your password must bu at least 3 symbols long');
                form.reset();
                return;
            }
            console.log(email.substring(0, email.indexOf('@')));
            if (email.substring(0, email.indexOf('@')).length < 3) {
                alert('your your must bu at least 3 symbols long');
                form.reset();
                return;
            }

            await register(email, password);
            form.reset();
            homeView.showView();
        }
    }
}