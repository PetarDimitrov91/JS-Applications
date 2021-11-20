import * as api from './api.js'
import * as userSession from './userSession.js';

const login = userSession.login;
const logout = userSession.logout;
const register = userSession.register;

async function createFurniture(furniture) {
    return api.post('/data/catalog', furniture);
}

async function getAllFurniture() {
    return api.get('/data/catalog');
}

async function getDetails(id) {
    return api.get('/data/catalog/' + id);
}

async function updateFurniture(id) {
    return api.put('/data/catalog/' + id);
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
    getDetails,
    updateFurniture,
    delFurniture,
    getMyFurniture
};