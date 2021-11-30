import {html,page} from "../utils.js";
import {createMeme} from "../api/data.js";
import {notify} from "../main.js";

const createTemp = (onCreate) => html`
    <section id="create-meme">
        <form @submit=${onCreate} id="create-form">
            <div class="container">
                <h1>Create Meme</h1>
                <label for="title">Title</label>
                <input id="title" type="text" placeholder="Enter Title" name="title">
                <label for="description">Description</label>
                <textarea id="description" placeholder="Enter Description" name="description"></textarea>
                <label for="imageUrl">Meme Image</label>
                <input id="imageUrl" type="text" placeholder="Enter meme ImageUrl" name="imageUrl">
                <input type="submit" class="registerbtn button" value="Create Meme">
            </div>
        </form>
    </section>
`;

export function showCreate(ctx) {
    ctx.render(createTemp(onCreate))

    async function onCreate(event) {
        event.preventDefault();

        const formData = [...(new FormData(event.target)).entries()];
        const meme = formData.reduce((a, [k, v]) => Object.assign(a, {[k]: v}), {});

        if (formData.filter(([k, v]) => !v.trim()).length > 0) {
            notify('please fill all fields');
            return;
        }
        await createMeme(meme);
        page.redirect('/catalog');
    }
}