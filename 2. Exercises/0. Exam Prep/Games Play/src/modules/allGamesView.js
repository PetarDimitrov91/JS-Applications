import {html} from "../utils.js";
import {getAllGames} from "../api/data.js";

const allGamesTemp = (games) => html`
    <section id="catalog-page">
        <h1>All Games</h1>
        ${games.length > 0
                ? games.map(gameTemp)
                : html`<h3 class="no-articles">No articles yet</h3>`
        }
    </section>`

const gameTemp = (game) => html`
    <div class="allGames">
    <div class="allGames-info">
        <img src=${game.imageUrl}>
        <h6>${game.category}</h6>
        <h2>${game.title}</h2>
        <a href="/details/${game._id}" class="details-button">Details</a>
    </div>
    </div>
`;

export async function showAllGames(ctx) {
    const games = await getAllGames();
    ctx.render(allGamesTemp(games));
}