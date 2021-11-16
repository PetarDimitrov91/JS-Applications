import {html, render} from "./node_modules/lit-html/lit-html.js";

const root = document.getElementById('root');
document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();
    const towns = document.getElementById('towns').value.split(',').map(t => t.trim());

    const result = listTemp(towns);
    render(result, root);
});

const listTemp = (towns) => html`
    <ul>
        ${towns.map(t => html`
            <li>${t}</li>`)};
    </ul>`;