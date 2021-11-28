import {html, page} from "../utils.js";
import {delGame, getComments, getGame, postComment} from "../api/data.js";
import {getUserData} from "../api/userSession.js";

const detailsTemp = (game, isOwner, onDelete, comments, userData, addComment) => html`
    <section id="game-details">
        <h1>Game Details</h1>
        <div class="info-section">
            <div class="game-header">
                <img class="game-img" src=${game.imageUrl}>
                <h1>${game.title}</h1>
                <span class="levels">MaxLevel: ${game.maxLevel}</span>
                <p class="type">${game.category}</p>
            </div>
            <p class="text">
                ${game.summary}
            </p>
            <div class="details-comments">
                <h2>Comments:</h2>
                ${comments.length > 0
                        ? html`
                            <ul>
                                ${comments.map(e => html`
                                    <li class="comment">
                                        <p>Content: ${e.comment}</p>
                                    </li>`)}
                            </ul>`
                        : html`<p class="no-comment">No comments.</p>`}
            </div>
        </div>
        ${!isOwner && userData !== null
                ? html`
                    <article class="create-comment">
                        <label>Add new comment:</label>
                        <form @submit=${addComment} class="form">
                            <textarea name="comment" placeholder="Comment......"></textarea>
                            <input class="btn submit" type="submit" value="Add Comment">
                        </form>
                    </article>`
                : null}
        ${isOwner
                ? html`
                    <div class="buttons">
                        <a href="/edit/${game._id}" class="button">Edit</a>
                        <a @click=${onDelete} href="#" class="button">Delete</a>
                    </div>`
                : null}
`;

export async function showDetails(ctx) {
    const id = ctx.params.id;
    const game = await getGame(id);
    const userData = getUserData();
    const isOwner = userData && userData.id === game._ownerId;

    const comments = await getComments(id);

    ctx.render(detailsTemp(game, isOwner, onDelete, comments, userData, addComment));

    async function onDelete(event) {
        event.preventDefault();
        await delGame(id);
        page.redirect('/home');
    }

    async function addComment(event) {
        event.preventDefault()
        const formData = new FormData(event.target);
        const comment = formData.get('comment').trim();
        const gameId = id;

        if (!comment) {
            alert('please fill the field');
            return;
        }

        postComment({gameId, comment});
        event.target.reset();
        page.redirect('/details/' + id);

    }
}