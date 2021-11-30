import {html} from "../utils.js";
import {getMyMemes} from "../api/data.js";
import {getUserData} from "../api/userSession.js";

const profileTemp = (memes, userData) => html`
    <section id="user-profile-page" class="user-profile">
        <article class="user-info">
            <img id="user-avatar-url" alt="user-profile" src="/images/${userData.gender}.png">
            <div class="user-content">
                <p>Username: ${userData.username}</p>
                <p>Email: ${userData.email}</p>
                <p>My memes count: ${memes.length}</p>
            </div>
        </article>
        <h1 id="user-listings-title">User Memes</h1>
        <div class="user-meme-listings">
            ${memes.length > 0
                    ? memes.map(memeTemp)
                    : html`<p class="no-memes">No memes in database.</p>`};
        </div>
    </section>
`;

const memeTemp = (meme) => html`
    <div class="user-meme">
        <p class="user-meme-title">${meme.title}</p>
        <img class="userProfileImage" alt="meme-img" src=${meme.imageUrl}>
        <a class="button" href="/details/${meme._id}">Details</a>
    </div>
`;


export async function showMyProfile(ctx) {
    const userData = getUserData();
    if (!userData) {
        return;
    }
    const myMemes = await getMyMemes(userData.id);
    ctx.render(profileTemp(myMemes, userData));
}