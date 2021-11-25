import {View} from "./View.js";
import {html, until} from "../utils.js";
import {getAllFurniture} from "../api/data.js";

export class Catalog extends View {
    constructor(root) {
        super(root);
    }

    async prepareView() {
        const items = this.loadItems();

        return () => html`
            <div class="container">
                <div class="row space-top">
                    <div class="col-md-12">
                        <h1>Welcome to Furniture System</h1>
                        <p>Select furniture from the catalog to view details.</p>
                    </div>
                </div>
                <div class="row space-top">
                    ${until(items, html`<p>Loading &hellip;</p>`)}
                </div>
            </div>`;
    }

    async loadItems() {
        const items = await getAllFurniture();

        const itemTemp = () => html`
            ${items.map(item => html`
                <div class="col-md-4">
                    <div class="card text-white bg-primary">
                        <div class="card-body">
                            <img src=${item.img}/>
                            <p>${item.description}</p>
                            <footer>
                                <p>Price: <span>${item.price} $</span></p>
                            </footer>
                            <div>
                                <a href=${`/details/${item._id}`} class="btn btn-info">Details</a>
                            </div>
                        </div>
                    </div>
                </div>`)}`;

        return itemTemp();
    }
}


