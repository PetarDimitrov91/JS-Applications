export function showView(view) {
    document.querySelector('main').replaceChildren(view);
}

export function createEl(type, attributes, ...context) {
    const element = document.createElement(type);

    for (const attr in attributes) {
        element[attr] = attributes[attr];
    }

    for (let el of context) {
        if (typeof el == 'string' || typeof el == 'number') {
            el = document.createTextNode(el);
        }
        element.appendChild(el);
    }

    return element;
}

export async function request(url, options) {
    const res = await fetch(url, options)
    return res.json();
}