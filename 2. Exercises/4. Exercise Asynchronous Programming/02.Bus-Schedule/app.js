function solve() {
    const departBtnRef = document.getElementById('depart');
    const arriveBtnRef = document.getElementById('arrive');
    const displayRef = document.querySelector('#info span');

    let busStop = {
        next: 'depot'
    }

    async function depart() {
        const url = `http://localhost:3030/jsonstore/bus/schedule/${busStop.next}`;
        const response = await fetch(url);
        busStop = await response.json();

        departBtnRef.disabled = true;
        arriveBtnRef.disabled = false;
        displayRef.textContent = `Next stop ${busStop.name}`;
    }

    function arrive() {
        departBtnRef.disabled = false;
        arriveBtnRef.disabled = true;
        displayRef.textContent = `Arriving at ${busStop.name}`;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();