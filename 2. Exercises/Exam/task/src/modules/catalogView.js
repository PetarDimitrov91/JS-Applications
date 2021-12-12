import {html} from "../utils.js";
import {getAlbums} from "../api/data.js";
import {getUserData} from "../api/userSession.js";

const catalogTemp = (albums, isUser) => html`
    <section id="catalogPage">
        <h1>All Albums</h1>

        ${albums.length > 0
                ? albums.map(e => albumTemp(e, isUser))
                : html`<p>No Albums in Catalog!</p>`
        }
    </section>
`;

const albumTemp = (album, isUser) => html`
    <div class="card-box">
        <img src=${album.imgUrl}>
        <div>
            <div class="text-center">
                <p class="name">Name: ${album.name}</p>
                <p class="artist">Artist: ${album.artist}</p>
                <p class="genre">Genre: ${album.genre}</p>
                <p class="price">Price: $${album.price}</p>
                <p class="date">Release Date: ${album.releaseDate}</p>
            </div>
            ${isUser
                    ? html`
                        <div class="btn-group">
                            <a href="/details/${album._id}" id="details">Details</a>
                        </div>`
                    : null}

        </div>
    </div>
`;

export async function showCatalog(ctx) {
    const albums = await getAlbums();
    const userData = getUserData();
    let isUser = false;

    if (userData !== null) {
        isUser = true;
    }

    ctx.render(catalogTemp(albums, isUser));
}