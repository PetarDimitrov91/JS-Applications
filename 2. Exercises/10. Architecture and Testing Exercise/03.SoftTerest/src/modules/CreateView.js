import {View} from "./View.js";
import {createIdea} from "../api/data.js";
import {dashboardView} from "../main.js";

export class CreateView extends View {
    constructor(section) {
        super(section);
    }

    showView() {
        super.showView();

        const form = this.section.querySelector('form');
        form.addEventListener('submit', addIdea);
        form.reset();

        async function addIdea(event) {
            event.preventDefault();

            const formData = new FormData(form);

            const title = formData.get('title').trim();
            const description = formData.get('description').trim();
            const img = formData.get('imageURL').trim();
            form.reset();

            if (!title || title.length < 6) {
                alert('title must be at least 6 characters long');
                return;
            }

            if (!description || description.length < 6) {
                alert('description must be at least 10 characters long');
                return;
            }

            if (!img || img.length < 6) {
                alert('img must be at least 5 characters long');
                return;
            }

            await createIdea({title, description, img});
            dashboardView.showView();
        }
    }
}