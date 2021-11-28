import {html, page} from "../utils.js";
import {createListing} from "../api/data.js";

const temp = (onSubmit) => html`
    <section id="create-listing">
        <div class="container">
            <form @submit=${onSubmit} id="create-form">
                <h1>Create Car Listing</h1>
                <p>Please fill in this form to create an listing.</p>
                <hr>

                <p>Car Brand</p>
                <input type="text" placeholder="Enter Car Brand" name="brand">

                <p>Car Model</p>
                <input type="text" placeholder="Enter Car Model" name="model">

                <p>Description</p>
                <input type="text" placeholder="Enter Description" name="description">

                <p>Car Year</p>
                <input type="number" placeholder="Enter Car Year" name="year">

                <p>Car Image</p>
                <input type="text" placeholder="Enter Car Image" name="imageUrl">

                <p>Car Price</p>
                <input type="number" placeholder="Enter Car Price" name="price">

                <hr>
                <input type="submit" class="registerbtn" value="Create Listing">
            </form>
        </div>
    </section>
`;

export function showCreate(ctx) {
    ctx.render(temp(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();

        const formData = [...(new FormData(event.target)).entries()];
        const car = formData.reduce((a, [k, v]) => Object.assign(a, {[k]: v}), {})

        if (formData.filter(([k, v]) => !v.trim()).length > 0) {
            alert('please fill all fields');
            return;
        }

        if (car.year <= 0 || car.price <= 0) {
            alert('The values of year and price must be positive numbers.');
            return;
        }

        car.year = Number(car.year);
        car.price = Number(car.price);

        await createListing(car);
        page.redirect('/allListings');
    }
}