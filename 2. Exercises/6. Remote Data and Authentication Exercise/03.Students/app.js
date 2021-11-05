window.addEventListener('DOMContentLoaded', startApp);

const form = document.getElementById('form')
const submitBtn = document.getElementById('submit');
const url = 'http://localhost:3030/jsonstore/collections/students';

form.addEventListener('submit', createStudent);

async function startApp() {
    try {
        await showStudents()
    } catch (e) {
        alert(e.message);
    }
}

async function createStudent(event) {
    event.preventDefault();
    submitBtn.disabled = true;

    const formData = new FormData(form);
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const facultyNumber = formData.get('facultyNumber');
    const grade = formData.get('grade');

    if (!firstName.trim() || !lastName.trim() || !facultyNumber.trim() || !grade.trim()) {
        alert('All fields are required');
        submitBtn.disabled = false;
        return;
    }

    const studentData = {firstName, lastName, facultyNumber, grade};
    const options = {
        method: 'post',
        headers: {
            'Content-Type': 'applications/json'
        },
        body: JSON.stringify(studentData)
    }

    form.reset();

    try {
        await Promise.all([fetch(url, options), showStudents()]);
    } catch (e) {
        alert(e.message);
    } finally {
        submitBtn.disabled = false;
    }
}

async function loadStudents() {
    const response = await fetch(url);
    return await response.json();
}

async function showStudents() {
    const tableResults = document.querySelector('tbody');
    tableResults.replaceChildren();

    Object.values(await loadStudents()).forEach(e => {
        const studentElement = create('tr',
            create('th', e['firstName']),
            create('th', e['lastName']),
            create('th', e['facultyNumber']),
            create('th', e['grade']),
        );
        tableResults.appendChild(studentElement);
    });
}

function create(type, ...content) {
    const element = document.createElement(type);

    for (let item of content) {
        if (typeof item === 'string' || typeof item === 'number') {
            item = document.createTextNode(item);
        }
        element.appendChild(item);
    }
    return element;
}