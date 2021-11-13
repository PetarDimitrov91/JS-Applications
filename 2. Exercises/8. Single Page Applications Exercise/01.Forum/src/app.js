import { showHome } from './home.js';

document.getElementById('homeLink').addEventListener('click', async (event) => {
    event.preventDefault();
    await showHome();
});

await showHome();