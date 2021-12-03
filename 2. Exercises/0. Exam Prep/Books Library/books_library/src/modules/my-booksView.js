import {html} from "../utils.js";
import {getMyBooks} from "../api/data.js";
import {getUserData} from "../api/userSession.js";

const myBooksTemp = (books) => html`
    <section id="my-books-page" class="my-books">
        <h1>My Books</h1>
        ${books.length > 0
                ? html`
                    <ul class="my-books-list">
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

export async function showMyBooks(ctx) {
    const userData = getUserData();
    const books = await getMyBooks(userData.id);
    ctx.render(myBooksTemp(books));
}