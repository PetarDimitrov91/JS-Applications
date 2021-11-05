const createForm = document.querySelector('#createForm');
const editForm = document.querySelector('#createForm');
const url = 'http://localhost:3030/jsonstore/collections/books';
const submitBtn = document.querySelector('#createForm button');
const saveBtn = document.querySelector('#saveForm button');
const loadBtn = document.getElementById('loadBooks');
const tableBody = document.querySelector('tbody');

createForm.addEventListener('submit', addBook);
loadBtn.addEventListener('click', loadBooks)
tableBody.addEventListener('click', buttonChecker);
editForm.addEventListener('submit', editBook);

async function addBook(event) {
    submitBtn.disabled = true;
    event.preventDefault();

    const formData = new FormData(createForm);
    const title = formData.get('title');
    const author = formData.get('author');

    createForm.reset();

    if (!title || !author) {
        alert('All field are required');
        submitBtn.disabled = false;
        return;
    }

    const body = {author, title};
    const options = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    };

    try {
        await fetch(url, options);
    } catch (e) {
        alert(e.message);
    } finally {
        submitBtn.disabled = false;
        await loadBooks();
    }
}

async function loadBooks() {
    try {
        const response = await fetch(url);
        const data = await response.json();

        tableBody.replaceChildren();

        Object.values(data).forEach(e => {
            const bookElement = create('tr', {},
                create('th', {}, e['title']),
                create('th', {}, e['author']),
                create('th', {},
                    create('button', {id: e['_id']}, 'Edit'),
                    create('button', {id: e['_id']}, 'Delete'),
                ));
            tableBody.appendChild(bookElement);
        });
    } catch (e) {
        alert(e.message);
    }
}

async function buttonChecker(event) {
    if (event.target.tagName === 'BUTTON' && event.target.textContent === 'Edit') {
        try {
            await editBook(event.target);
        } catch (e) {
            alert(e.message);
        }
    } else if (event.target.tagName === 'BUTTON' && event.target.textContent === 'Delete') {
        try {
            await deleteBook(event.target);
        } catch (e) {
            alert(e.message);
        }
    }
}

async function editBook(button) {

    const [name, author] = button.parentElement.parentElement.children;

    document.querySelector('#editForm[name=title]').value = name.textContent;
    document.querySelector('#editForm[name=author]').value = author.textContent;

    submitBtn.textContent = 'Save';

    const updateUrl = `${url}/${button.dataset.id}`;
    const formData = new FormData(editForm);

    const body = {
        author: formData.get('author'),
        title: formData.get('title')
    }

    const options = {
        method: 'put',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }
    await fetch(updateUrl, options);
}


async function deleteBook(button) {
    const deleteUrl = `${url}/${button.dataset.id}`;
    await fetch(deleteUrl, {method: 'delete'});
    button.parentElement.parentElement.remove();
}


function create(type, attributes, ...content) {
    const element = document.createElement(type);

    if (type === 'button') {
        element.dataset.id = attributes['id'];
    }

    for (let item of content) {
        if (typeof item === 'string' || typeof item === 'number') {
            item = document.createTextNode(item);
        }
        element.appendChild(item);
    }
    return element;
}