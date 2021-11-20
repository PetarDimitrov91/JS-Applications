export class View {
    constructor(root) {
        if (new.target === View) {
            throw new Error('The class is an Abstract class and can not be instantiated');
        }
        this.root = root;
    }

    prepareView(){
    }

    showView(ctx) {
        const temp = this.prepareView();
        ctx.render(temp());
    }

    attachView() {
    }
}
