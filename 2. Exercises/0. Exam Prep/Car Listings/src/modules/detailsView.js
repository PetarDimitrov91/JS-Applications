import {html, page} from "../utils.js";
import {deleteCar, getCarDetails} from "../api/data.js";
import {getUserData} from "../api/userSession.js";

const temp = (car, isOwner, onDelete) => html`
    <section id="listing-details">
        <h1>Details</h1>
        <div class="details-info">
            <img src=${car.imageUrl}>
            <hr>
            <ul class="listing-props">
                <li><span>Brand:</span>${car.brand}</li>
                <li><span>Model:</span>${car.model}</li>
                <li><span>Year:</span>${car.year}</li>
                <li><span>Price:</span>${car.price}$</li>
            </ul>

            <p class="description-para">${car.description}</p>

            <div class="listings-buttons">
                ${isOwner
                        ? html`
                            <a href="/edit/${car._id}" class="button-list">Edit</a>
                            <a @click=${onDelete} href="#" class="button-list">Delete</a>`
                        : null
                }
            </div>
        </div>
    </section>
`;

export async function showDetails(ctx) {
    const car = await getCarDetails(ctx.params.id);
    const userData = getUserData();
    const isOwner = userData && userData.id === car._ownerId;
    ctx.render(temp(car, isOwner, onDelete));

    async function onDelete(event) {
        event.preventDefault();

        confirm('Are you sure?');
        await deleteCar(ctx.params.id);

        page.redirect('/allListings');
    }

}

