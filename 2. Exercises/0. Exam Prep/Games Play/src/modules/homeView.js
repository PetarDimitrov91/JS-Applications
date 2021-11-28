import {html} from "../utils.js";
import {getRecentGames} from "../api/data.js";

const homeTemp = (games) => html`
    <section id="welcome-world">

        <div class="welcome-message">
            <h2>ALL new games are</h2>
            <h3>Only in GamesPlay</h3>
        </div>
        <img src="/images/four_slider_img01.png" alt="hero">

        <div id="home-page">
            <h1>Latest Games</h1>
            ${games.length > 0
                    ? games.map(gameTemp)
                    : html`<p class="no-articles">No games yet</p>`}
        </div>
    </section>
`;

const gameTemp = (car) => html`
    <div class="game">
        <div class="image-wrap">
            <img src=${car.imageUrl}>
        </div>
        <h3>${car.title}</h3>
        <div class="rating">
            <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
        </div>
        <div class="data-buttons">
            <a href="/details/${car._id}" class="btn details-btn">Details</a>
        </div>
    </div>
`;

export async function showHome(ctx) {
    let games = await getRecentGames();

    if (games.length > 3) {
        games = games.slice(0, 3)
    }
    ctx.render(homeTemp(games));
}