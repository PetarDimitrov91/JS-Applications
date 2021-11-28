import * as api from './api.js'
import * as userSession from './userSession.js';

const login = userSession.login;
const logout = userSession.logout;
const register = userSession.register;


export function getRecentGames() {
    return api.get('/data/games?sortBy=_createdOn%20desc&distinct=category');
}

export function getAllGames() {
    return api.get('/data/games?sortBy=_createdOn%20desc');
}

export function createGame(game) {
    return api.post('/data/games', game);
}

export function getGame(id) {
    return api.get('/data/games/' + id);
}

export function delGame(id) {
    return api.del('/data/games/' + id);
}

export function editGame(id, game) {
    return api.put('/data/games/' + id, game);
}

export function getComments(gameId) {
    return api.get(`/data/comments?where=gameId%3D%22${gameId}%22`)
}

export function postComment(comment) {
    return api.post('/data/comments', comment);
}

/*

export async function getAllCars() {
    return api.get('/data/cars?sortBy=_createdOn%20desc');
}

export async function createListing(item) {
    return api.post('/data/cars', item);
}

export function getCarDetails(id) {
    return api.get('/data/cars/' + id);
}

export function deleteCar(id) {
    return api.del('/data/cars/' + id);
}

export function editCar(car, id) {
    return api.put('/data/cars/' + id, car);
}

export function getMyListings(userId){
    return api.get(`/data/cars?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
}

export function search(query){
    return api.get(`/data/cars?where=year%3D${query}`);
}

 */