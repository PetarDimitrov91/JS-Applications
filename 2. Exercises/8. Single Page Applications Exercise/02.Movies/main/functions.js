import {LOGIN_URL} from "../modules/constants.js";

const main = document.querySelector('main')

function createEl(type, attributes, ...content) {
    const domElement = document.createElement(type);

    for (const property in attributes) {
        if (property.includes('ownerData')) {
            domElement.dataset.ownerId = attributes[property];
            continue;
        } else if (property.includes('movieId')) {
            domElement.dataset.movieId = attributes[property];
            continue;
        }
        domElement[property] = attributes[property];
    }

    for (let item of content) {
        if (typeof item === "string" || typeof item === 'number') {
            item = document.createTextNode(item);
        }
        domElement.appendChild(item);
    }

    return domElement;
}

function showView(section) {
    main.replaceChildren(section);
}

async function getRequest(url) {
    const request = await fetch(url);
    return await request.json();
}

async function postRequest(url, body) {
    const res = await fetch(url, {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)
    });
    if (res.ok === true) {
        return res.json();
    } else {
        return null;
    }
}

async function putRequest(url) {

}

async function deleteRequest(url, id, token) {

}


export {createEl, showView, getRequest, postRequest, putRequest, deleteRequest};
