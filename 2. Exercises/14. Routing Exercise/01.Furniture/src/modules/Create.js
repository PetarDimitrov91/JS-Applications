import {View} from "./View.js";
import {html, page, render} from "../utils.js";
import {createFurniture} from "../api/data.js";

export class Create extends View {
    constructor(root) {
        super(root);
    }

    prepareView() {
        const temp = (errObj) => html`
            <div class="container">
                <div class="row space-top">
                    <div class="col-md-12">
                        <h1>Create New Furniture</h1>
                        <p>Please fill all fields.</p>
                    </div>
                </div>
                <form @submit=${this.create.bind(null, this.root, temp)}>
                    ${errObj ? html`
                        <div class="form-group err">${errObj.errMsg.join(', ')}</div>` : null}
                    <div class="row space-top">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="form-control-label" for="new-make">Make</label>
                                <input class=${errObj ? 'form-control' + (errObj && errObj.errors.make ? ' is-invalid' : ' is-valid') : 'form-control'}
                                       id="new-make" type="text" name="make">
                            </div>
                            <div class="form-group has-success">
                                <label class="form-control-label" for="new-model">Model</label>
                                <input class=${errObj ? 'form-control' + (errObj && errObj.errors.model ? ' is-invalid' : ' is-valid') : 'form-control'}
                                       id="new-model" type="text" name="model">
                            </div>
                            <div class="form-group has-danger">
                                <label class="form-control-label" for="new-year">Year</label>
                                <input class=${errObj ? 'form-control' + (errObj && errObj.errors.year ? ' is-invalid' : ' is-valid') : 'form-control'}
                                       id="new-year" type="number" name="year">
                            </div>
                            <div class="form-group">
                                <label class="form-control-label" for="new-description">Description</label>
                                <input class=${errObj ? 'form-control' + (errObj && errObj.errors.description ? ' is-invalid' : ' is-valid') : 'form-control'}
                                       id="new-description" type="text" name="description">
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="form-control-label" for="new-price">Price</label>
                                <input class=${errObj ? 'form-control' + (errObj && errObj.errors.price ? ' is-invalid' : ' is-valid') : 'form-control'}
                                       id="new-price" type="number" name="price">
                            </div>
                            <div class="form-group">
                                <label class="form-control-label" for="new-image">Image</label>
                                <input class=${errObj ? 'form-control' + (errObj && errObj.errors.img ? ' is-invalid' : ' is-valid') : 'form-control'}
                                       id="new-image" type="text" name="img">
                            </div>
                            <div class="form-group">
                                <label class="form-control-label" for="new-material">Material (optional)</label>
                                <input class="form-control" id="new-material" type="text" name="material">
                            </div>
                            <input type="submit" class="btn btn-primary" value="Create"/>
                        </div>
                    </div>
                </form>
            </div>`;

        return temp;
    }

    async create(root, temp, event) {
        event.preventDefault();

        const formData = [...(new FormData(event.target)).entries()];
        const item = formData.reduce((a, [k, v]) => Object.assign(a, {[k]: v}), {});

        const missing = formData.filter(([k, v]) => k !== 'material' && v === '');

        let errors = {};
        let errObj = {};
        let errorMessages = [];


        if (missing.length > 0) {
            errors = missing.reduce((a, [k]) => Object.assign(a, {[k]: true}), {});
            errObj = {
                errMsg: ['Please fill all mandatory fields!'],
                errors
            };

            render(temp(errObj), root);
            return;
        }

        item.year = Number(item.year);
        item.price = Number(item.price);

        if (item.make.trim().length < 4) {
            errorMessages.push('Make must be at least 4 symbols long');
            errors.make = true;
        }

        if (item.model.trim().length < 4) {
            errorMessages.push('Model must be at least 4 symbols long');
            errors.model = true;
        }

        if (item.year < 1950 || item.year > 2050) {
            errorMessages.push('Year must be between 1950 and 2050');
            errors.year = true;
        }

        if (item.description.trim().length <= 10) {
            errorMessages.push('Description must be more than 10 symbols');
            errors.description = true;
        }

        if (item.price <= 0) {
            errorMessages.push('Price must be a positive number');
            errors.price = true;
        }

        if (item.img.trim().length === 0) {
            errorMessages.push('Image URL is required');
            errors.img = true;
        }

        if (errorMessages.length > 0) {
            errObj = {
                errMsg: errorMessages,
                errors
            };

            render(temp(errObj), root);
            return;
        }

        const furniture = await createFurniture(item);

        page.redirect('/details/' + furniture._id);
    }
}