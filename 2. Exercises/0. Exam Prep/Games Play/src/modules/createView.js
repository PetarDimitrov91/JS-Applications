import {html,page} from "../utils.js";
import {createGame} from "../api/data.js";

const createTemp = (onSubmit) => html`
    <section id="create-page" class="auth">
        <form @submit=${onSubmit} id="create">
            <div class="container">

                <h1>Create Game</h1>
                <label for="leg-title">Legendary title:</label>
                <input type="text" id="title" name="title" placeholder="Enter game title...">

                <label for="category">Category:</label>
                <input type="text" id="category" name="category" placeholder="Enter game category...">

                <label for="levels">MaxLevel:</label>
                <input type="number" id="maxLevel" name="maxLevel" min="1" placeholder="1">

                <label for="game-img">Image:</label>
                <input type="text" id="imageUrl" name="imageUrl" placeholder="Upload a photo...">

                <label for="summary">Summary:</label>
                <textarea name="summary" id="summary"></textarea>
                <input class="btn submit" type="submit" value="Create Game">
            </div>
        </form>
    </section>
`;

export function showCreate(ctx) {
    ctx.render(createTemp(onSubmit))

    async function onSubmit(event) {
        event.preventDefault();

        const formData = [...(new FormData(event.target)).entries()];
        const game = formData.reduce((a, [k, v]) => Object.assign(a, {[k]: v}), {});

        if (formData.filter(([k, v]) => !v.trim()).length > 0) {
            alert('please fill all fields');
            return;
        }
        await createGame(game);
        page.redirect('/home');
    }
}