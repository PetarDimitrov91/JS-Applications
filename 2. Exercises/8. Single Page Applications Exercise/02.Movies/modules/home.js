import {createEl, getRequest, showView} from "../main/functions.js";
import {ALL_MOVIES_URL} from "./constants.js";

const homeSection = document.getElementById('home-page');
const catalog = document.querySelector('.card-deck.d-flex.justify-content-center');
const userData = JSON.parse(sessionStorage.getItem('userData'));
const navGreeting = document.getElementById('greeting');

if (userData !== null) {
    navGreeting.textContent = userData.email;
}

export async function loadHomePage() {
    showView(homeSection);
    showMovies();
    if (userData !== null) {
        navGreeting.textContent = userData.email;
    }
}

//TODO: Implement cashing action!!!

async function showMovies() {
    catalog.replaceChildren(createEl('p',{},'Loading...'));

    const moviesData = await getRequest(ALL_MOVIES_URL);

    catalog.replaceChildren( ...moviesData.map(movie => {
        const {_ownerId, title, description, img, _createdOn, _id} = movie;
        return createEl('div', {className: 'card mb-4'},
            createEl('img', {className: 'card-img-top', src: img, alt: 'Card image cap', width: '400'}),
            createEl('div', {className: 'card-body'},
                createEl('h4', {}, title)
            ),
            createEl('div', {className: 'card-footer'},
                createEl('button', {
                    type: 'button',
                    className: 'btn btn-info',
                    'ownerData': _ownerId,
                    'movieId': _id
                }, 'Details')
            )
        );
    }));
}