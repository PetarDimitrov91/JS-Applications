import {html, page} from "../utils.js";
import { editMeme, getMemeById} from "../api/data.js";
import {notify} from "../main.js";

const editTemp = (onEdit, meme) => html`
    <section id="edit-meme">
        <form @submit=${onEdit} id="edit-form">
            <h1>Edit Meme</h1>
            <div class="container">
                <label for="title">Title</label>
                <input id="title" type="text" placeholder="Enter Title" name="title" .value=${meme.title}>
                <label for="description">Description</label>
                <textarea id="description" placeholder="Enter Description" name="description">
                            ${meme.description}
                        </textarea>
                <label for="imageUrl">Image Url</label>
                <input id="imageUrl" type="text" placeholder="Enter Meme ImageUrl" name="imageUrl"
                       .value=${meme.imageUrl}>
                <input type="submit" class="registerbtn button" value="Edit Meme">
            </div>
        </form>
    </section>
`;

export async function showEdit(ctx) {
    const id = ctx.params.id;
    const meme = await getMemeById(id);

    ctx.render(editTemp(onEdit, meme));

    async function onEdit(event) {
        event.preventDefault();

        const formData = [...(new FormData(event.target)).entries()];
        const meme = formData.reduce((a, [k, v]) => Object.assign(a, {[k]: v}), {});

        if (formData.filter(([k, v]) => !v.trim()).length > 0) {
            notify('please fill all fields');
            return;
        }
        await editMeme(id,meme);
        page.redirect('/details/' + id);
    }

}