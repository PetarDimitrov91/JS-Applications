import {HomeView} from "../modules/HomeView.js";
import {AddView} from "../modules/AddView.js";
import {LoginView} from "../modules/LoginView.js";
import {RegisterView} from "../modules/RegisterView.js";
import {DetailsView} from "../modules/DetailsView.js";
import {EditView} from "../modules/EditView.js";
import {
    addLike,
    createMovie,
    deleteMovie,
    getLikeFromUser,
    getLikesNumber,
    getMovieById,
    revokeLike,
    login,
    logout,
    register
} from "../api/data.js";

const homeSection = document.getElementById('home-page');
const addSection = document.getElementById('add-movie');
const loginSection = document.getElementById('form-login');
const registerSection = document.getElementById('form-sign-up');
const detailsSection = document.getElementById('movie-example');
const editSection = document.getElementById('edit-movie');

const homeView = new HomeView(homeSection);

homeView.showView();

document.getElementById('home-redirection').addEventListener('click', () => {
    homeView.showView();
});

document.getElementById('login').addEventListener('click', () => {

    const loginView = new LoginView(loginSection);
    loginView.showView();

    const form = loginSection.querySelector('form');
    //this code will execute when we are in login view
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(form);

        const email = formData.get('email').trim();
        const password = formData.get('password').trim();

        if (!email || !password) {
            alert('all fields are required');
            form.reset();
            return;
        }
        form.reset();
        await login(email, password);
        homeView.showView();
    });
});

document.getElementById('logout').addEventListener('click', async () => {
    await logout();
    homeView.showView();
});

document.getElementById('register').addEventListener('click', (event) => {
    const registerView = new RegisterView(registerSection);
    registerView.showView();

    const form = registerSection.querySelector('form');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(form);

        const email = formData.get('email').trim();
        const password = formData.get('password').trim();
        const repass = formData.get('repeatPassword').trim();

        if (!email || !password && password !== repass) {
            alert('allFields are required');
            return;
        }

        await register(email, password);
        homeView.showView();
    });
});

document.getElementById('movie').addEventListener('click', async (event) => {
    const detailsView = new DetailsView(detailsSection);

    if (event.target.tagName !== 'BUTTON') {
        return;
    }

    if (event.target.textContent === 'Details') {
        const movieId = event.target.dataset.movieId;
        if (!movieId) {
            return;
        }
        await showMovieDetails(movieId);
    }

    async function showMovieDetails(movieId) {
        const movie = await getMovieById(movieId);
        await detailsView.showView(movie);
    }
    const deleteBtn = document.getElementById('deleteBtn');
    const editBtn = document.getElementById('editBtn');
    const likeBtn = document.getElementById('likeBtn');
    const liked = document.querySelector('span');

    const userData = JSON.parse(sessionStorage.getItem('userData'));
    let userLikes;


    if (userData === null) {
        likeBtn.remove();
        deleteBtn.remove();
        editBtn.remove();
    } else {
        userLikes = await getLikeFromUser(liked.id, userData.id);
        if (userData.id !== deleteBtn.dataset.ownerId) {
            deleteBtn.remove();
            editBtn.remove();

        }
        if (userData.id === deleteBtn.dataset.ownerId) {
            likeBtn.remove();
            deleteBtn.addEventListener('click', () => {
                deleteMovie(deleteBtn.dataset.movieId);
                homeView.showView();
            });
        }
    }

    if (userLikes.length > 0) {
        likeBtn.textContent = 'Unlike';
    }
    await likeBtn.addEventListener('click', async () => {

        if (likeBtn.textContent === 'Like') {
            userLikes = await getLikeFromUser(liked.id, userData.id);

            await addLike(liked.id);
            const likesNumber = await getLikesNumber(liked.id)

            likeBtn.textContent = 'Unlike'
            liked.textContent = `Liked: ${likesNumber}`;

        } else if (likeBtn.textContent === 'Unlike') {
            userLikes = await getLikeFromUser(liked.id, userData.id);
            likeBtn.textContent = 'Like';

            await revokeLike(userLikes[0]['_id']);
            const likesNumber = await getLikesNumber(liked.id)

            liked.textContent = `Liked: ${likesNumber}`;
        }
    });
    await editBtn.addEventListener('click', async () => {
        const editView = new EditView(editSection);
        editView.showView();

        const movieId = editBtn.dataset.movieId;
        const movie = await getMovieById(movieId);

        const form = document.querySelector('#editForm')
        const title = form.querySelector('[name=title]');
        const description = form.querySelector('[name=description]');
        const url = form.querySelector('[name=imageUrl]');

        title.value = movie.title;
        description.value = movie.description;
        url.value = movie.img;

        form.addEventListener('submit', editView.editMovie.bind(null, editBtn, showMovieDetails))
    });
});

document.querySelector('#add-movie-button a').addEventListener('click', () => {
    const addView = new AddView(addSection);
    addView.showView();

    const form = document.getElementById('addForm');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const title = formData.get('title');
        const description = formData.get('description');
        const img = formData.get('imageUrl');

        if (!title || !description || !img) {
            alert('all fields are required');
            form.reset();
            return;
        }

        form.reset();

        await createMovie({title, description, img});
        homeView.showView();
    });
});

