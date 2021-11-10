import {loadHomePage} from "../modules/home.js";
import {addNavListeners} from "../modules/navigation.js";

const addMovieSection = document.getElementById('add-movie');
const movieDetailsSection = document.getElementById('movie-example');
const editSection = document.getElementById('edit-movie');
const loginSection = document.getElementById('form-login');
const registerSection = document.getElementById('form-sign-up');


addNavListeners();
await loadHomePage();

export {addMovieSection,movieDetailsSection,editSection,loginSection,registerSection};