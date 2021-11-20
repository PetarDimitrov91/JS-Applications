import {html, render} from '../node_modules/lit-html/lit-html.js';
import {until} from '../node_modules/lit-html/directives/until.js';

export {html, render,until};

const host = 'http://localhost:3030/jsonstore/collections';

async function request(url, method, data) {
    const options = {
        method,
        headers: {}
    };

    if (data !== undefined) {
        options.headers['Content-type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    const response = await fetch(host + url, options);

    if (response.ok === false) {
        const error = await response.json();
        alert(error.message);
        throw new Error(error.message);
    }

    return response.json();
}

async function getBooks() {
    return request('/books');
}

async function getById(id) {
    return request('/books/' + id);
}

async function createBook(book) {
    return request('/books', 'post', book);
}

async function updateBook(id, book) {
    return request('/books/' + id, 'put', book);
}

async function deleteBook(id) {
    return request('/books/' + id, 'delete');
}

export {getBooks, getById, createBook, updateBook, deleteBook};