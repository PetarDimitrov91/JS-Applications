import {html} from "../utils.js";
import {getAllBooks} from "../api/data.js";

const catalogTemp = (books) => html`
    <section id="dashboard-page" class="dashboard">
        <h1>Dashboard</h1>
        ${books.length > 0
                ? html`
                    <ul class="other-books-list">
                        ${books.map(bookTemp)}
                    </ul>`
                : html` <p class="no-books">No books in database!</p>`
        }
    </section>
`;

const bookTemp = (book) => html`
    <li class="otherBooks">
        <h3>${book.title}</h3>
        <p>Type: ${book.type}</p>
        <p class="img"><img src=${book.imageUrl}></p>
        <a class="button" href="/details/${book._id}">Details</a>
    </li>
`;


export async function showCatalog(ctx) {
    const books = await getAllBooks();
    ctx.render(catalogTemp(books));
}