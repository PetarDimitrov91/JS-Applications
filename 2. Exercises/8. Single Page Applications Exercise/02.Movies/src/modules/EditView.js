import {View} from "./View.js";
import {updateMovie} from "../api/data.js";

export class EditView extends View {
    constructor(section) {
        super(section);
    }

    async editMovie(button, detailsView, event) {
        event.preventDefault();

        console.log(button.dataset.movieId);
        console.log(detailsView);

        const form = document.querySelector('#editForm');
        const formData = new FormData(form);

        const title = formData.get('title');
        const description = formData.get('description');
        const img = formData.get('imageUrl');

        if (!title || !description || !img) {
            alert('all fields are required');
            form.reset();
            return;
        }
        form.reset();
        debugger
        await updateMovie(button.dataset.movieId, {title, description, img});
        await detailsView(button.dataset.movieId);
        document.getElementById('likeBtn').remove();
    }
}