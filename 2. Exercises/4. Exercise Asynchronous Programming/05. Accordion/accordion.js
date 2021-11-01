window.addEventListener('DOMContentLoaded', solution);

async function solution() {
    const mainSection = document.getElementById('main');
    const url = 'http://localhost:3030/jsonstore/advanced/articles/list';

    const response = await fetch(url);
    const data = await response.json();

    for (const article of data) {
        const {_id, title} = article;

        const articleElement = create('div', {className: 'accordion'},
            create('div', {className: 'head'},
                create('span', {}, title),
                create('button', {className: 'button', id: _id}, 'More')
            ),
            create('div', {className: 'extra'})
        );

        articleElement.querySelector('button').addEventListener("click", showMoreInfo);
        mainSection.appendChild(articleElement);
    }

    async function showMoreInfo(event) {
        const btn = event.target;
        const url = `http://localhost:3030/jsonstore/advanced/articles/details/${btn.id}`;
        const infoDiv = event.target.parentNode.parentNode.querySelector('div .extra');

        const response = await fetch(url);
        const data = await response.json();
        if (infoDiv.childElementCount === 0) {
            const infoParagraph = create('p', {}, data.content);
            infoDiv.appendChild(infoParagraph);
            infoDiv.style.display = 'inline-block'
            btn.textContent = 'Less';
        } else if (btn.textContent === 'Less') {
            infoDiv.style.display = 'none'
            btn.textContent = 'More';
        } else {
            infoDiv.style.display = 'inline-block';
            btn.textContent = 'Less';
        }
    }

    function create(type, attributes, ...content) {
        const element = document.createElement(type);

        for (const property in attributes) {
            element[property] = attributes[property];
        }

        for (let el of content) {
            if (typeof el === 'string' || typeof el === 'number') {
                el = document.createTextNode(el);
            }
            element.appendChild(el);
        }
        return element
    }
}