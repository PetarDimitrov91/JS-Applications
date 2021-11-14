import * as api from './api.js'
import * as userSession from './userSession.js';

const login = userSession.login;
const logout = userSession.logout;
const register = userSession.register;

async function getAllIdeas() {
    return api.get('/data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc');
}

async function getById(id) {
    return api.get('/data/ideas/' + id);
}

async function createIdea(idea) {
    return api.post('/data/ideas', idea);
}

async function deleteById(id) {
    return api.del('/data/ideas/' + id);
}

export {login, logout, register, getAllIdeas, getById, createIdea, deleteById};