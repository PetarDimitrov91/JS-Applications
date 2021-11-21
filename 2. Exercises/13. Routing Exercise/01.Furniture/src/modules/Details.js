import {View} from "./View.js";
import {html, page} from "../utils.js";
import {delFurniture, getItem} from "../api/data.js";

export class Details extends View {
    constructor(root) {
        super(root);
    }

    async prepareView(id) {
        const item = await getItem(id);

        const userData = JSON.parse(sessionStorage.getItem('userData'));

        return () => html`
            <div class="container">
                <div class="row space-top">
                    <div class="col-md-12">
                        <h1>Furniture Details</h1>
                    </div>
                </div>
                <div class="row space-top">
                    <div class="col-md-4">
                        <div class="card text-white bg-primary">
                            <div class="card-body">
                                <img src=${item.img}/>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <p>Make: <span>${item.make}</span></p>
                        <p>Model: <span>${item.model}</span></p>
                        <p>Year: <span>${item.year}</span></p>
                        <p>Description: <span>${item.description}</span></p>
                        <p>Price: <span>${item.price} $</span></p>
                        <p>Material: <span>${item.material}</span></p>
                        ${userData && userData.id === item._ownerId
                                ? html`
                                    <div>
                                        <a href="/edit/${id}" class="btn btn-info">Edit</a>
                                        <a @click=${this.onDelete.bind(null, id)} href="javascript:void(0)"
                                           class="btn btn-red">Delete</a>
                                    </div>`
                                : null
                        }
                    </div>
                </div>
            </div>`;
    }

    async onDelete(id, event) {
        event.preventDefault()
        await delFurniture(id);
        confirm('You want to delete this furniture, are you sure?');
        page.redirect('/');
    }
}