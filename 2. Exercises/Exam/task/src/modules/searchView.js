import {html} from "../utils.js";
import {searchByName} from "../api/data.js";
import {getUserData} from "../api/userSession.js";

const searchTemp = (onSearch, albums, isUser) => html`
    <section id="searchPage">
        <h1>Search by Name</h1>

        <div class="search">
            <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
            <button @click=${onSearch} class="button-list">Search</button>
        </div>
        <h2>Results:</h2>
        ${albums
                ? html`
                    <div class="search-result">
                        ${albums.length === 0
                                ? html`<p class="no-result">No result.</p>`
                                : albums.map(e => albumTemp(e, isUser))
                        }
                    </div>`
                : null
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

export function showSearch(ctx) {
    ctx.render(searchTemp(onSearch))

    async function onSearch() {
        const query = document.getElementById('search-input').value.trim();
        const searchedAlbums = await searchByName(query);

        if (!query) {
            alert('please fill the field');
            return;
        }
        const userData = getUserData();
        const isUser = userData !== null;

        ctx.render(searchTemp(onSearch, searchedAlbums, isUser))
    }
}