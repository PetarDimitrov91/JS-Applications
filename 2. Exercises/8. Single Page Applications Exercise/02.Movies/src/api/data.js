import * as api from './api.js';
import * as userSession from './userSession.js';

const login = userSession.login;
const register = userSession.register;
const logout = userSession.logout;

export {login, register, logout}

export async function getAllMovies() {
    return api.get('data/movies');
}

export async function getMovieById(id) {
    return api.get('data/movies/' + id);
}

export async function createMovie(movie) {
    return api.post('data/movies', movie);
}

export async function updateMovie(id,data) {
    return api.put('data/movies/' + id,data);
}

export async function deleteMovie(id) {
    return api.del('data/movies/' + id);
}

export async function getLikesNumber(id) {
    return api.get(`data/likes?where=movieId%3D%22${id}%22&distinct=_ownerId&count`);
}

export async function getLikeFromUser(movieId, userId) {
    return api.get(`data/likes?where=movieId%3D%22${movieId}%22%20and%20_ownerId%3D%22${userId}%22`)
}

export async function addLike(body) {
    return api.post('data/likes',{movieId:body});
}

export async function revokeLike(id) {
    return api.del('data/likes/' + id)
}
