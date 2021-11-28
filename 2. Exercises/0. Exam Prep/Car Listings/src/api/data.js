import * as api from './api.js'
import * as userSession from './userSession.js';

const login = userSession.login;
const logout = userSession.logout;
const register = userSession.register;


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

/*

async function getItem(id) {
    return api.get('/data/catalog/' + id);
}

async function updateFurniture(id, item) {
    return api.put('/data/catalog/' + id, item);
}

async function delFurniture(id) {
    return api.del('/data/catalog/' + id);
}

async function getMyFurniture(userId) {
    return api.get(`/data/catalog?where=_ownerId%3D%22${userId}%22`);
}

async function getSearchedItem(make) {
    // localhost:3030/data/catalog?where=make%20LIKE%20%22chair%22
    return api.get(`/data/catalog?where=make%20LIKE%20%22${make}%22`);
}

export {
    login,
    logout,
    register,
    createFurniture,
    getAllFurniture,
    getItem,
    updateFurniture,
    delFurniture,
    getMyFurniture,
    getSearchedItem
};


 */