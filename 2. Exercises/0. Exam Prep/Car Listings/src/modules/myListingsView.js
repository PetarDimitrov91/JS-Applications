import {html} from "../utils.js";
import {getMyListings} from "../api/data.js";
import {getUserData} from "../api/userSession.js";

const temp = (cars) => html`
    <section id="my-listings">
        ${cars.length > 0
                ? html`
                    <h1>My car listings</h1>
                    <div class="listings">
                        ${cars.map(carTemp)}`
                : html`<p class="no-cars">You haven\'t listed any cars yet.</p>`}
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

export async function showMyListings(ctx) {
    const userData = getUserData();
    const cars = await getMyListings(userData.id);
    ctx.render(temp(cars));
}