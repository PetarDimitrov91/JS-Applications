import {html, page} from "../utils.js";
import {createGame, editGame, getGame} from "../api/data.js";

const editTemp = (game, onSubmit) => html`
    <section id="edit-page" class="auth">
        <form @submit=${onSubmit} id="edit">
            <div class="container">

                <h1>Edit Game</h1>
                <label for="leg-title">Legendary title:</label>
                <input type="text" id="title" name="title" value="" .value=${game.title}>

                <label for="category">Category:</label>
                <input type="text" id="category" name="category" value="" .value=${game.category}>

                <label for="levels">MaxLevel:</label>
                <input type="number" id="maxLevel" name="maxLevel" min="1" value="" .value=${game.maxLevel}>

                <label for="game-img">Image:</label>
                <input type="text" id="imageUrl" name="imageUrl" value="" .value=${game.imageUrl}>

                <label for="summary">Summary:</label>
                <textarea name="summary" id="summary" .value=${game.summary}></textarea>
                <input class="btn submit" type="submit" value="Edit Game">

            </div>
        </form>
    </section>
`;

export async function showEdit(ctx) {
    const id = ctx.params.id;
    const game = await getGame(id);

    ctx.render(editTemp(game, onSubmit));

    async function onSubmit(event) {
        event.preventDefault();

        const formData = [...(new FormData(event.target)).entries()];
        const game = formData.reduce((a, [k, v]) => Object.assign(a, {[k]: v}), {});

        if (formData.filter(([k, v]) => !v.trim()).length > 0) {
            alert('please fill all fields');
            return;
        }
        await editGame(id,game);
        page.redirect(`/details/${id}`);
    }
}