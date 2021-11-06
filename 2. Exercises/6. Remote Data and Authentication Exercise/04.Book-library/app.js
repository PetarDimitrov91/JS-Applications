const createForm = document.querySelector('#createForm');
const editForm = document.querySelector('#editForm');
const submitBtn = document.querySelector('#createForm button');
const saveBtn = document.querySelector('#editForm button');
const loadBtn = document.getElementById('loadBooks');
const tableBody = document.querySelector('tbody');
const url = 'http://localhost:3030/jsonstore/collections/books';

editForm.style.display = 'none';
createForm.addEventListener('submit', addBook);
editForm.addEventListener('submit', saveBook);
loadBtn.addEventListener('click', loadBooks)
tableBody.addEventListener('click', buttonChecker);

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
        body: JSON.stringify(body)
    };

    await Promise.all([request(url, options), loadBooks()]);

    submitBtn.disabled = false;
}

async function loadBooks() {
    const data = await request(url);

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
}

async function buttonChecker(event) {
    if (event.target.tagName === 'BUTTON' && event.target.textContent === 'Edit') {
        try {
            editBook(event.target);
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

function editBook(button) {
    editForm.style.display = 'block';
    createForm.style.display = 'none';

    const [name, author] = button.parentElement.parentElement.children;

    editForm.querySelector('[name=title]').value = name.textContent;
    editForm.querySelector('[name=author]').value = author.textContent;
    saveBtn.dataset.id = button.dataset.id;
}

async function saveBook(event) {
    event.preventDefault();

    const updateUrl = `${url}/${saveBtn.dataset.id}`;
    const formData = new FormData(editForm);

    const body = {
        author: formData.get('author'),
        title: formData.get('title'),
        _id: saveBtn.dataset.id
    }

    const options = {
        method: 'put',
        body: JSON.stringify(body)
    }

    await request(updateUrl, options);

    editForm.reset()
    editForm.style.display = 'none';
    createForm.style.display = 'block';

    await loadBooks();
}

async function deleteBook(button) {
    const deleteUrl = `${url}/${button.dataset.id}`;
    await request(deleteUrl, {method: 'delete'});
    button.parentElement.parentElement.remove();
}

async function request(url, options) {
    if (options && options.body !== undefined) {
        Object.assign(options, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    const response = await fetch(url, options);

    if (response.ok !== true) {
        const error = await response.json();
        alert(error.message);
        throw new Error(error.message);
    }

    return await response.json();
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