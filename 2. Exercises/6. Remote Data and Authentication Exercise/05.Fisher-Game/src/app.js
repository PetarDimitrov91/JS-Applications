let userData = null;
let catchesLegend = null;

window.addEventListener('DOMContentLoaded', () => {
    catchesLegend = document.querySelector('main legend');
    document.getElementById('catches').replaceChildren();
    catchesLegend.textContent = 'No Catches Loaded';

    userData = JSON.parse(sessionStorage.getItem('userData'));
    if (userData !== null) {
        document.getElementById('guest').style.display = 'none';
        document.querySelector('#addForm .add').disabled = false;
        document.querySelector('.email span').textContent = `${userData.email}`;

        document.getElementById('addForm').addEventListener('submit', addCatch);
        document.getElementById('main').addEventListener('click', eventChecker);

        document.getElementById('logout').addEventListener('click', async () => {
            const response = await fetch('http://localhost:3030/users/logout', {headers: {'X-Authorization': `${userData.token}`}});
            if (response.status === 204) {
                sessionStorage.clear();
                window.location = 'index.html'
            }
        });

    } else {
        document.getElementById('user').style.display = 'none';
        document.querySelector('.email span').textContent = `guest`;
    }

    document.querySelector('.load').addEventListener('click', loadData);
});

async function loadData() {
    catchesLegend.textContent = 'Loading...';

    const res = await fetch('http://localhost:3030/data/catches');
    const data = await res.json();

    catchesLegend.textContent = 'Catches';
    document.getElementById('catches').replaceChildren(...data.map(createPreview));
}

function createPreview(item) {
    const isOwner = userData && item._ownerId === userData.id;

    const element = document.createElement('div');
    element.className = 'catch';
    element.innerHTML = `<label>Angler</label>
<input type="text" class="angler" value="${item.angler}" ${!isOwner ? 'disabled' : ''}>
<label>Weight</label>
<input type="text" class="weight" value="${item.weight}" ${!isOwner ? 'disabled' : ''}>
<label>Species</label>
<input type="text" class="species" value="${item.species}" ${!isOwner ? 'disabled' : ''}>
<label>Location</label>
<input type="text" class="location" value="${item.location}" ${!isOwner ? 'disabled' : ''}>
<label>Bait</label>
<input type="text" class="bait" value="${item.bait}" ${!isOwner ? 'disabled' : ''}>
<label>Capture Time</label>
<input type="number" class="captureTime" value="${item.captureTime}" ${!isOwner ? 'disabled' : ''}>
<button class="update" data-id="${item._id}" ${!isOwner ? 'disabled' : ''}>Update</button>
<button class="delete" data-id="${item._id}" ${!isOwner ? 'disabled' : ''}>Delete</button>`

    return element;
}

async function addCatch(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const angler = formData.get('angler');
    const weight = formData.get('weight');
    const species = formData.get('species');
    const location = formData.get('location');
    const bait = formData.get('bait');
    const captureTime = formData.get('captureTime');

    if (!angler.trim() || !weight.trim() || !species.trim() || !location.trim() || !bait.trim() || !captureTime.trim()) {
        alert('all fields are required');
        return;
    }

    const options = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': `${userData.token}`
        },
        body: JSON.stringify({
            angler, weight, species, location, bait, captureTime
        })
    };
    document.getElementById('addForm').reset();

    try {
        await fetch('http://localhost:3030/data/catches', options)
    } catch (error) {
        alert(error.message)
    }finally {
        await loadData();
    }
}

async function eventChecker(event) {
    //console.log(event.target.dataset.id);
    if (event.target.textContent === 'Update') {
        await updateCatch(event.target)
    } else if (event.target.textContent === 'Delete') {
        await deleteCatch(event.target);
    }
}

async function deleteCatch(button) {
    const id = button.dataset.id;
    try {
        await fetch('http://localhost:3030/data/catches/' + id, {
            method: 'delete',
            headers: {
                'X-Authorization': `${userData.token}`
            }
        });
    } catch (error) {
        alert(error.message);
    }
    button.parentElement.remove();
}

async function updateCatch(button) {
    const id = button.dataset.id;
    const parentElement = button.parentElement;

    const angler = parentElement.querySelector('[class=angler]').value;
    const weight = parentElement.querySelector('[class=weight]').value;
    const species = parentElement.querySelector('[class=species]').value;
    const location = parentElement.querySelector('[class=location]').value;
    const bait = parentElement.querySelector('[class=bait]').value;
    const captureTime = parentElement.querySelector('[class=captureTime]').value;

    try {
        await fetch('http://localhost:3030/data/catches/' + id, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': `${userData.token}`
            },
            body: JSON.stringify({angler, weight, species, location, bait, captureTime})
        });

        const span = document.createElement('span');
        span.textContent = 'd successfully';
        button.appendChild(span);

        setTimeout(hideElement, 1200) //milliseconds until timeout//
        function hideElement() {
            span.style.display = 'none';
        }
    } catch (error) {
        alert(error);
    }
}






