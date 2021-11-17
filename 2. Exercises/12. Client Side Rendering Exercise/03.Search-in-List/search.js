import {towns as townNames} from "./towns.js";
import {html, render} from './node_modules/lit-html/lit-html.js';

const towns = townNames.map(t => ({town: t, searched: false}));
const townsList = document.querySelector('#towns');
const input = document.querySelector('#searchText');
const res = document.querySelector('#result');

document.querySelector('button').addEventListener('click', search);

const template = (towns) => html`
    <ul>
        ${towns.map(t => html`
            <li class=${t.searched ? 'active' : ''}>${t.town}</li>
        `)}
    </ul>
`;

function update() {
    render(template(towns), townsList);
}

function search() {
    const searched = input.value.trim().toLocaleLowerCase();
    const matches = towns.filter(c => searched && c.town.toLowerCase().includes(searched)).length;

    towns.forEach(o => {
        o.searched = searched && o.town.toLocaleLowerCase().includes(searched);
    });

    res.textContent = `${matches} matches found`;
    input.value = '';

    update();
}

update();