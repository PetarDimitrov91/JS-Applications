import {html} from "../utils.js";
import {search} from "../api/data.js";

const temp = (showResults, cars) => html`
    <section id="search-cars">
        <h1>Filter by year</h1>

        <div class="container">
            <input id="search-input" type="text" name="search"
                   placeholder="Enter desired production year">
            <button @click=${showResults} id="btn" class="button-list">Search</button>
        </div>
        ${cars
                ? html`
                    <h2>Results:</h2>
                    <div class="listings">
                        ${cars.length > 0
                                ? cars.map(carTemp)
                                : html`<p class="no-cars">No cars in database.</p>`}
                    </div>
                ` : null}

    </section>
`;

const carTemp = (car) => html`
    <div class="listing">
        <div class="preview">
            <img src=${car.imageUrl}>
        </div>
        <h2>${car.brand} ${car.model}</h2>
        <div class="info">
            <div class="data-info">
                <h3>Year: ${car.year}</h3>
                <h3>Price: ${car.price} $</h3>
            </div>
            <div class="data-buttons">
                <a href="/details/${car._id}" class="button-carDetails">Details</a>
            </div>
        </div>
    </div>
`;

export function showSearch(ctx) {
    ctx.render(temp(showResults));

    async function showResults(event) {
        event.preventDefault();
        debugger
        const searched = document.querySelector('#search-input').value;
        const results = await search(searched);
        ctx.render(temp(showResults, results));
    }

}