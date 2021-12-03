import {html, page} from "../utils.js";
import {createBook, editBook, getBookById} from "../api/data.js";

const editTemp = (book, onEdit) => html`
    <section id="edit-page" class="edit">
        <form @submit=${onEdit} id="edit-form" action="#" method="">
            <fieldset>
                <legend>Edit my Book</legend>
                <p class="field">
                    <label for="title">Title</label>
                    <span class="input">
                            <input type="text" name="title" id="title" value=${book.title}>
                        </span>
                </p>
                <p class="field">
                    <label for="description">Description</label>
                    <span class="input">
                            <textarea name="description"
                                      id="description">${book.description}</textarea>
                        </span>
                </p>
                <p class="field">
                    <label for="image">Image</label>
                    <span class="input">
                            <input type="text" name="imageUrl" id="image" value=${book.imageUrl}>
                        </span>
                </p>
                <p class="field">
                    <label for="type">Type</label>
                    <span class="input">
                            <select id="type" name="type" .value=${book.type}>
                                <option value="Fiction" selected>Fiction</option>
                                <option value="Romance">Romance</option>
                                <option value="Mistery">Mistery</option>
                                <option value="Classic">Clasic</option>
                                <option value="Other">Other</option>
                            </select>
                        </span>
                </p>
                <input class="button submit" type="submit" value="Save">
            </fieldset>
        </form>
    </section>
`;

export async function showEdit(ctx) {
    const book = await getBookById(ctx.params.id);
    ctx.render(editTemp(book, onEdit));

    async function onEdit(event) {
        event.preventDefault();

        const formData = [...(new FormData(event.target)).entries()];
        const book = formData.reduce((a, [k, v]) => Object.assign(a, {[k]: v}), {});

        if (formData.filter(([k, v]) => !v.trim()).length > 0) {
            alert('please fill all fields');
            return;
        }

        await editBook(ctx.params.id, book);
        event.target.reset();
        page.redirect('/details/' + ctx.params.id);
    }
}