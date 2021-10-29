async function getInfo() {
    const inputRef = document.getElementById('stopId');
    const url = `http://localhost:3030/jsonstore/bus/businfo/${inputRef.value}`;
    const outputRef = document.getElementById('stopName');

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data)
    } catch (ex) {
        outputRef.textContent = ex.message;
    }


}