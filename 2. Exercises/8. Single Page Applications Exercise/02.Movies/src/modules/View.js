export class View {
    constructor(section) {
        this.section = section;
        this.main = document.querySelector('main');
    }

    showView() {
        this.main.replaceChildren(this.section);
    }
}