import * as api from './api.js';
import * as userSession from './userSession.js';

const login = userSession.login;
const logout = userSession.logout;
const register = userSession.register;

export function getAlbums() {
    return api.get('/data/albums?sortBy=_createdOn%20desc&distinct=name');
}

export function getAlbumById(id) {
    return api.get('/data/albums/' + id);
}

export function createAlbum(album) {
    return api.post('/data/albums', album);
}

export function editAlbum(id, album) {
    return api.put('/data/albums/' + id, album);
}

export function deleteAlbum(id) {
    return api.del('/data/albums/' + id);
}

export function searchByName(query) {
    return api.get(`/data/albums?where=name%20LIKE%20%22${query}%22`);
}
