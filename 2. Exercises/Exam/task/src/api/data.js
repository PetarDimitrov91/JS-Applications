import * as api from './api.js';
import * as userSession from './userSession.js';


const login = userSession.login;
const logout = userSession.logout;
const register = userSession.register;





/*
export async function getAllBooks() {
    return api.get('/data/books?sortBy=_createdOn%20desc');
}

export async function getBookById(id) {
    return api.get('/data/books/' + id);
}

export async function createBook(book) {
    return api.post('/data/books', book)
}

export async function editBook(id, book) {
    return api.put('/data/books/' + id, book);
}

export function getMyBooks(userId) {
    return api.get(`/data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
}

export function deleteBook(bookId) {
    return api.del('/data/books/' + bookId);
}

export async function getLikes(bookId) {
    return api.get(`/data/likes?where=bookId%3D%22${bookId}%22&distinct=_ownerId&count`);
}

export async function like(bookId) {
    return api.post('/data/likes', bookId)
}

export async function userHasLiked(bookId, userId) {
    return api.get(`/data/likes?where=bookId%3D%22${bookId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}

*/