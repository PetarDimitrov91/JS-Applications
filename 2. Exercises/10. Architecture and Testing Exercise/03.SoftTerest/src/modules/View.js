export class View {
    constructor(section) {
        if (new.target === View) {
            throw new Error('The class is an Abstract class and can not be instantiated');
        }
        this.section = section;
        this.main = document.querySelector('main');
    }

   showView() {
        this.main.replaceChildren(this.section);
    }
}