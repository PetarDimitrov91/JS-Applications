import {View} from "./View.js";
import {createEl} from "./domManipulation.js";
import {getLikesNumber} from "../api/data.js";

export class DetailsView extends View {
    constructor(section) {
        super(section);
    }

    async showView(movie) {
        this.section.replaceChildren();
        this.main.replaceChildren(this.section);

        const fragment = document.createDocumentFragment();
        const likes = await getLikesNumber(movie['_id']);

        fragment.appendChild(createEl('div', {className: 'row bg-light text-dark'},
            createEl('h1', {}, `Movie Title: ${movie.title}`),
            createEl('div', {className: 'col-md-8'},
                createEl('img', {
                    className: 'img-thumbnail',
                    src: `${movie['img']}`,
                    alt: 'Movie'
                })
            ),
            createEl('div', {className: 'col-md-4 text-center'},
                createEl('h3', {}, 'Movie Description'),
                createEl('p', {}, `${movie.description}`),
                createEl('a', {
                    className: 'btn btn-danger',
                    href: '#',
                    'movieId': movie['_id'],
                    'ownerData': movie['_ownerId'],
                    id: 'deleteBtn'
                }, 'Delete'),
                createEl('a', {
                    className: 'btn btn-warning',
                    href: '#',
                    'movieId': movie['_id'],
                    'ownerData': movie['_ownerId'],
                    id: 'editBtn'
                }, 'Edit'),
                createEl('a', {
                    className: 'btn btn-primary',
                    href: '#',
                    'movieId': movie['_id'],
                    'ownerData': movie['_ownerId'],
                    id: 'likeBtn'
                }, 'Like'),
                createEl('span', {className: 'enrolled-span', 'id': movie['_id']}, `Liked: ${likes}`)
            )));

        this.section.appendChild(fragment);
        this.main.appendChild(this.section);
    }
}
