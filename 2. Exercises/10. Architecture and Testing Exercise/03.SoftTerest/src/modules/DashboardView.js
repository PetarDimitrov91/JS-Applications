import {View} from "./View.js";
import {getAllIdeas} from "../api/data.js";
import {createEl} from "../dom/domManipulation.js";
import {IdeaView} from "./IdeaView.js";
import {ideaSection} from "../main.js";

export class DashboardView extends View {
    constructor(section) {
        super(section);
    }

    async showView() {
        this.section.replaceChildren(createEl('h3',{}, 'Loading...'));
        this.main.replaceChildren(this.section);

        const fragment = document.createDocumentFragment();

        const ideas = await getAllIdeas()

        if (ideas.length === 0) {
            this.section.replaceChildren(createEl('h1', {}, 'No ideas yet! Be the first one :)'));
            return;
        }

        const ideaView = new IdeaView(ideaSection);

        for (const idea of ideas) {
            const {_id, title, img} = idea;

            const element = createEl('div', {
                    className: 'card overflow-hidden current-card details',
                    style: {width: '20rem', height: '18rem'}
                },
                createEl('div', {className: 'card-body'},
                    createEl('p', {className: 'card-text'}, title)
                ),
                createEl('img', {className: 'card-image', src: img, alt: 'Card image cap'})
            );

            const detailsBtn = createEl('a', {className: 'btn', ideaId: _id, href: '#'}, 'Details');
            detailsBtn.addEventListener('click', ideaView.showView.bind(ideaView,_id));

            element.appendChild(detailsBtn);
            fragment.appendChild(element);
        }
        this.section.replaceChildren(fragment);
    }
}
