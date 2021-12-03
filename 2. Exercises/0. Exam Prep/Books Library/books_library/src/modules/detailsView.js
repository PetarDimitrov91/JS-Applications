import {html, page} from "../utils.js";
import {deleteBook, getBookById, getLikes, like, userHasLiked} from "../api/data.js";
import {getUserData} from "../api/userSession.js";

const detailsTemp = (book, isOwner, likes, likeBook, hasLiked, isUser, onDelete) => html`
    <section id="details-page" class="details">
        <div class="book-information">
            <h3>${book.title}</h3>
            <p class="type">Type: ${book.type}</p>
            <p class="img"><img src=${book.imageUrl}></p>
            <div class="actions">
                ${isOwner
                        ? html`<!-- Edit/Delete buttons ( Only for creator of this book )  -->
                        <a class="button" href=${'/edit/' + book._id}>Edit</a>
                        <a @click=${onDelete} class="button" href="javascript:void(0)">Delete</a>`
                        : null}
                ${hasLiked || isUser === false || !isOwner === false ? null : html`
                    <a @click=${likeBook} class="button" href="javascript:void(0)">Like</a>`}
                <div class="likes">
                    <img class="hearts" src="/images/heart.png">
                    <span id="total-likes">Likes: ${likes}</span>
                </div>

            </div>
        </div>
        <div class="book-description">
            <h3>Description:</h3>
            <p>${book.description}</p>
        </div>
    </section>
`;

export async function showDetails(ctx) {
    const bookId = ctx.params.id;
    const book = await getBookById(bookId);
    const userData = await getUserData();

    let isOwner = false;
    let hasLiked = false;
    let isUser = false;

    if (userData !== null) {
        isOwner = book._ownerId == userData.id;
        hasLiked = await userHasLiked(bookId, userData.id) === 1;
        isUser = true;
    }

    const likes = await getLikes(bookId);

    ctx.render(detailsTemp(book, isOwner, likes, postLike, hasLiked, isUser, onDelete));

    async function postLike() {
        await like({bookId});
        page.redirect('/details/' + bookId);
    }

    async function onDelete() {
        await deleteBook(bookId);
        page.redirect('/catalog');
    }


}