import {Navigation} from "./Navigation.js";

export class View {
    constructor(root) {
        if (new.target === View) {
            throw new Error('The class is an Abstract class and can not be instantiated');
        }
        this.root = root;
    }

    async showView(ctx) {
        const id = ctx.params.id;
        const temp = await this.prepareView(id);
        ctx.render(temp());
        Navigation.updateNav();
    }

    prepareView() {
    }

    attachView() {
    }
}
