import {render, html} from 'https://unpkg.com/lit-html?module';

const dropdownTemp = (options) => html`
    <h1>Dropdown Menu</h1>
    <article>
        <div>
            <select id="menu">
                ${options.map(x => optionTemp(x))}
            </select>
        </div>
        <form>
            <label for="itemText">
                Text:
            </label>
            <input type="text" id="itemText"/>
            <input type="submit" value="Add">
        </form>
    </article>`;

const optionTemp = ({text, _id}) => html`
    <option value=${_id}>${text}</option>`;

await drawOptions();

async function drawOptions() {
    const data = await getRequest();

    render(dropdownTemp(Object.values(data)), document.querySelector('body'));
}


document.addEventListener('submit', async e => {
    e.preventDefault();

    const input = document.getElementById(`itemText`);

    await postRequest({
        text: input.value
    });

    await drawOptions();
    input.value = '';
});

async function requestChecker(response) {
    if (!response.ok) {
        throw new Error(response.status);
    }

    return await response.json();
}

async function getRequest() {
    const response = await fetch('http://localhost:3030/jsonstore/advanced/dropdown ');

    return await requestChecker(response);
}

async function postRequest(entry) {
    const response = await fetch('http://localhost:3030/jsonstore/advanced/dropdown ', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(entry)
    });

    return await requestChecker(response);
}