import {View} from "./View.js";
import {deleteById, getById} from "../api/data.js";
import {createEl} from "../dom/domManipulation.js";
import {dashboardView} from "../main.js";

export class IdeaView extends View {
    constructor(section) {
        super(section);
    }

    get _section() {
        return this.section;
    }

    async showView(id) {

        this.section.replaceChildren();
        this.main.replaceChildren(this._section)
        const fragment = document.createDocumentFragment();

        const idea = await getById(id);

        const {_ownerId, title, description, img, _createdOn, _id} = idea;

        const imgElement = createEl('img', {className: 'det-img', src: img});

        const element = createEl('div', {className: 'desc'},
            createEl('h2', {className: 'display-5'}, title),
            createEl('p', {className: 'infoType'}, 'Description:'),
            createEl('p', {className: 'idea-description'}, description));

        fragment.appendChild(imgElement);
        fragment.appendChild(element);

        const userData = JSON.parse(sessionStorage.getItem('userData'));

        if (userData !== null) {
            if (userData.id == _ownerId) {
                const divDelete = createEl('div', {className: 'text-center'});
                const deleteBtn = createEl('a', {className: 'btn detb', href: '#', ideaId: _id}, 'Delete');

                deleteBtn.addEventListener('click', async (event) => {
                    await deleteById(event.target.dataset.ideaId)
                    dashboardView.showView();
                });
                divDelete.appendChild(deleteBtn);
                fragment.appendChild(divDelete);
            }
        }
        this.section.replaceChildren(fragment);
    }
}
