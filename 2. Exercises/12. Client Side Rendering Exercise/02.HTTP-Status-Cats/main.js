import {html, render} from './node_modules/lit-html/lit-html.js';
import {cats as catData} from "./catSeeder.js";

const catCard = (cat,) => html`
    <li>
        <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
        <div class="info">
            <button @click=${() => toggleInfo(cat)} class="showBtn">${cat.info ? 'Hide' :'Show'} status code</button>
            ${cat.info ? html`
                <div class="status" id="${cat.id}">
                    <h4 class="card-title">Status Code: ${cat.statusCode}</h4>
                    <p class="card-text">${cat.statusMessage}</p>
                </div>` : null}
        </div>
    </li>
`;

const root = document.getElementById('allCats');
const cat = catCard(catData);

catData.forEach(c => c.info = false);

update();

function update() {
    render(html`
        <ul>${catData.map(catCard)}</ul>`, root);
}

function toggleInfo(cat) {
    cat.info = !cat.info;
    update();
}