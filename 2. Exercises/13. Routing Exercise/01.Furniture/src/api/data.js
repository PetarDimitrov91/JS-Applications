import * as api from './api.js'
import * as userSession from './userSession.js';

const login = userSession.login;
const logout = userSession.logout;
const register = userSession.register;

async function createFurniture(item) {
    return api.post('/data/catalog', item);
}

async function getAllFurniture() {
    return api.get('/data/catalog');
}

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

export {
    login,
    logout,
    register,
    createFurniture,
    getAllFurniture,
    getItem,
    updateFurniture,
    delFurniture,
    getMyFurniture
};