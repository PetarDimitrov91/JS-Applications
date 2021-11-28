import {html, page} from "../utils.js";
import { editCar, getCarDetails} from "../api/data.js";

const temp = (car, onSubmit) => html`
    <section id="edit-listing">
        <div class="container">

            <form @submit=${onSubmit} id="edit-form">
                <h1>Edit Car Listing</h1>
                <p>Please fill in this form to edit an listing.</p>
                <hr>

                <p>Car Brand</p>
                <input type="text" placeholder="Enter Car Brand" name="brand" value="" .value = ${car.brand}>

                <p>Car Model</p>
                <input type="text" placeholder="Enter Car Model" name="model" value="" .value = ${car.model}>

                <p>Description</p>
                <input type="text" placeholder="Enter Description" name="description" value="" .value = ${car.description}>

                <p>Car Year</p>
                <input type="number" placeholder="Enter Car Year" name="year" value="" .value = ${car.year}>

                <p>Car Image</p>
                <input type="text" placeholder="Enter Car Image" name="imageUrl" value="" .value = ${car.imageUrl}>

                <p>Car Price</p>
                <input type="number" placeholder="Enter Car Price" name="price" value="" .value = ${car.price}>

                <hr>
                <input type="submit" class="registerbtn" value="Edit Listing">
            </form>
        </div>
    </section>
`;


export async function showEditCar(ctx) {
    const id = ctx.params.id;
    const car = await getCarDetails(id);

    ctx.render(temp(car, onSubmit));

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

        await editCar(car, id);
        page.redirect('/details/' + id);
    }
}