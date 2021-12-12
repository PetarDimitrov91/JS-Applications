import {html, page} from "../utils.js";
import {deleteAlbum, getAlbumById} from "../api/data.js";
import {getUserData} from "../api/userSession.js";

const detailsTemp = (album, isOwner, onDelete) => html`
    <section id="detailsPage">
        <div class="wrapper">
            <div class="albumCover">
                <img src=${album.imgUrl}>
            </div>
            <div class="albumInfo">
                <div class="albumText">

                    <h1>Name: ${album.name}</h1>
                    <h3>Artist: ${album.artist}</h3>
                    <h4>Genre: ${album.genre}</h4>
                    <h4>Price: $${album.price}</h4>
                    <h4>Date: ${album.releaseDate}</h4>
                    <p>Description: ${album.description}</p>
                </div>
                <!-- Only for registered user and creator of the album-->
                ${isOwner ? html`
                            <div class="actionBtn">
                                <a href="/edit/${album._id}" class="edit">Edit</a>
                                <a @click=${onDelete} href="javascript:void(0)" class="remove">Delete</a>
                            </div>`
                        : null}
            </div>
        </div>
    </section>
`;

export async function showDetails(ctx) {
    const userData = getUserData();
    const albumId = ctx.params.id;
    const album = await getAlbumById(albumId);

    let isOwner = false;

    if (userData !== null && userData.id === album._ownerId) {
        isOwner = true;
    }

    ctx.render(detailsTemp(album, isOwner, onDelete));

    async function onDelete() {
        await deleteAlbum(albumId);
        page.redirect('/catalog');
    }
}