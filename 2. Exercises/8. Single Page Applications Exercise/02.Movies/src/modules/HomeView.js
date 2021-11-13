import {createEl} from "./domManipulation.js";
import {getAllMovies} from "../api/data.js";
import {View} from "./View.js";

export class HomeView extends View{
    constructor(section) {
        super(section);
    }

    showView() {
        this.main.replaceChildren(this.section);
        HomeView.loadMovies();

        const userData = JSON.parse(sessionStorage.getItem('userData'));
        const navGreeting = document.getElementById('greeting');

        if (userData !== null) {
            navGreeting.textContent = 'Welcome, ' + userData.email;
            document.querySelectorAll('.guest').forEach(e => e.style.display = 'none');
            document.querySelectorAll('.user').forEach(e => e.style.display = 'inline-block');
        } else {
            navGreeting.textContent = 'Welcome Guest';
            document.querySelectorAll('.user').forEach(e => e.style.display = 'none');
            document.querySelectorAll('.guest').forEach(e => e.style.display = 'inline-block');
        }
    }

    static async loadMovies() {
        const catalog = document.querySelector('.card-deck.d-flex.justify-content-center');
        catalog.replaceChildren(createEl('p', {}, 'Loading...'));

        const moviesData = await getAllMovies();

        catalog.replaceChildren(...moviesData.map(movie => {
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
}