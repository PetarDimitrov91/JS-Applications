async function getInfo() {
    const inputRef = document.getElementById('stopId');
    const url = `http://localhost:3030/jsonstore/bus/businfo/${inputRef.value}`;
    const outputRef = document.getElementById('stopName');
    const resultDIv = document.getElementById('result');
    const ulElementRef = document.getElementById('buses');

    try {
        ulElementRef.replaceWith();
        outputRef.textContent = 'Loading...'
        const response = await fetch(url);

        if (response.status !== 200) {
            throw new Error('Error')
        }

        const data = await response.json();
        outputRef.textContent = data.name;

        const ulElement = document.createElement('ul');
        ulElement.id = 'buses';

        Object.entries(data['buses']).forEach(e => {
            const liElement = document.createElement('li');
            liElement.textContent = `Bus ${e[0]} arrives in ${e[1]} minutes`;
            ulElement.appendChild(liElement);
            resultDIv.appendChild(ulElement);
        });

    } catch (ex) {
        outputRef.textContent = ex.message;
    }
}