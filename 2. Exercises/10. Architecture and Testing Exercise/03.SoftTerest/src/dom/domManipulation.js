function createEl(type, attributes, ...content) {
    const domElement = document.createElement(type);

    for (const property in attributes) {
        if (property.includes('ownerData')) {
            domElement.dataset.ownerId = attributes[property];
            continue;
        } else if (property.includes('ideaId')) {
            domElement.dataset.ideaId = attributes[property];
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

export {createEl};