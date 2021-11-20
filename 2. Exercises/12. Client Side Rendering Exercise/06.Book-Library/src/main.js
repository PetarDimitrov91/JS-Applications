import {render} from "./utility.js";
import {showCatalog} from "./catalog.js";
import {showCreate} from "./create.js";
import {showUpdate} from "./update.js";

const root = document.body;

const ctx = {
    update
};

update();

function update() {
    render([
        showCatalog(ctx),
        showCreate(ctx),
        showUpdate(ctx)
    ], root);
}

