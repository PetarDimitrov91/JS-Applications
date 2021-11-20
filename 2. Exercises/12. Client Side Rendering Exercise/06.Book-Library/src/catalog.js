import {deleteBook, getBooks, html, until} from './utility.js';

const catalogTemp = (booksPromise) => html`
    <table>
        <thead>
        <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Action</th>
        </tr>
        </thead>
        <tbody>
        ${until(booksPromise, html`
            <tr>
                <td colspan="3">Loading&hellip;</td>
            </tr>`)}

        </tbody>
    </table>
`;

const bookRow = (book, onEdit, onDelete) => html`
    <tr>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>
            <button @click=${onEdit} class="edit">Edit</button>
            <button @click=${onDelete} class="delete">Delete</button>
        </td>
    </tr>
`;

export function showCatalog(ctx) {
    return catalogTemp(loadBooks(ctx));
}

async function loadBooks(ctx) {
    const data = await getBooks();

    const books = Object.entries(data).map(([k, v]) => Object.assign(v, {_id: k}));

    return Object.values(books).map(book => bookRow(book, toggleEditor.bind(null, book, ctx), onDelete.bind(null, book._id, ctx)));
}

function toggleEditor(book, ctx) {
    ctx.book = book;
    ctx.update();
}

async function onDelete(id, ctx) {
    await deleteBook(id);
    ctx.update();
}