function attachEvents() {
    const url = 'http://localhost:3030/jsonstore/phonebook';
    const loadBtn = document.getElementById('btnLoad')
    const createBtn = document.getElementById('btnCreate');
    const personInput = document.getElementById('person');
    const phoneInput = document.getElementById('phone');
    const phonebook = document.getElementById('phonebook');

    loadBtn.addEventListener('click', showContacts);
    createBtn.addEventListener('click', createContact);
    phonebook.addEventListener('click', deleteContact);

    async function deleteContact(event) {
        console.log(event.target);
        if (event.target.tagName === 'BUTTON') {
            const deleteUrl = `${url}/${event.target.dataset.id}`;
            try {
                await fetch(deleteUrl, {
                    method: 'delete'
                });
                event.target.parentNode.parentNode.remove();
            } catch (e) {
                alert(e.message);
            }
        }
    }

    async function createContact() {
        if (!personInput.value.trim() || !phoneInput.value.trim()) {
            alert('All field are required');
            return;
        }

        const body = {
            person: personInput.value,
            phone: phoneInput.value
        };

        const options = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }
        try {
            await fetch(url, options);

            personInput.value = '';
            phoneInput.value = '';

            await showContacts();
        } catch (e) {
            alert(e.message)
        }
    }

    async function showContacts() {
        phonebook.replaceChildren();
        try {
            const data = await loadContacts();
            Object.values(data).forEach(e => {
                const contactRecord =
                    create('li', {},
                        create('p', {}, `${e['person']}: ${e['phone']}`,
                            create('button', {id: e['_id']}, 'delete')),
                    );
                phonebook.appendChild(contactRecord);
            });
        } catch (e) {
            alert(e.message);
        }
    }

    async function loadContacts() {
        const response = await fetch(url);
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
}

attachEvents();