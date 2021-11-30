import {html, page} from "../utils.js";
import {deleteMeme, getMemeById} from "../api/data.js";
import {getUserData} from "../api/userSession.js";

const detailsTemp = (meme, isOwner, del) => html`
    <section id="meme-details">
        <h1>Meme Title: ${meme.title}</h1>
        <div class="meme-details">
            <div class="meme-img">
                <img alt="meme-alt" src=${meme.imageUrl}>
            </div>
            <div class="meme-description">
                <h2>Meme Description</h2>
                <p>
                    ${meme.description}
                </p>
                ${isOwner
                        ? html`
                            <a class="button warning" href="/edit/${meme._id}">Edit</a>
                            <button @click=${del} class="button danger">Delete</button>`
                        : null}


            </div>
        </div>
    </section>
`;

export async function showDetails(ctx) {
    const id = ctx.params.id;
    const meme = await getMemeById(id);
    const userData = getUserData();

    let isOwner = false;

    if (userData !== null) {
        if (userData.id === meme._ownerId) {
            isOwner = true
        }
    }

    ctx.render(detailsTemp(meme, isOwner, del));

    async function del(event) {
        event.preventDefault();
        await deleteMeme(id);
        page.redirect('/catalog');
    }

}