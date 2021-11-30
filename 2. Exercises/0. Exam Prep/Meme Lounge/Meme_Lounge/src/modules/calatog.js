import {html} from "../utils.js";
import {getAllMemes} from "../api/data.js";

const catalogTemp = (memes) => html`
    <section id="meme-feed">
        <h1>All Memes</h1>
        <div id="memes">
            ${memes
                    ? memes.map(memeTemp)
                    : html`<p class="no-memes">No memes in database.</p>`
            }
        </div>
    </section>
`;

const memeTemp = (meme) => html`
    <div class="meme">
        <div class="card">
            <div class="info">
                <p class="meme-title">${meme.title}</p>
                <img class="meme-image" alt="meme-img" src=${meme.imageUrl}>
            </div>
            <div id="data-buttons">
                <a class="button" href="/details/${meme._id}">Details</a>
            </div>
        </div>
    </div>
`;


export async function showCatalog(ctx) {
    const memes = await getAllMemes();
    ctx.render(catalogTemp(memes));
}