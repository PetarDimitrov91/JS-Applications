function attachEvents() {
    const messagesArea = document.getElementById('messages');
    messagesArea.value = '';

    window.addEventListener('DOMContentLoaded', displayMessages);

    const nameInput = document.querySelector('[name=author]');
    const messageInput = document.querySelector('[name=content]');
    const sendBtn = document.getElementById('submit');
    const refreshBtn = document.getElementById('refresh');

    const url = 'http://localhost:3030/jsonstore/messenger';

    sendBtn.addEventListener('click', sendMessage);
    refreshBtn.addEventListener('click', displayMessages);

    async function sendMessage() {

        if (!messageInput.value.trim() && !nameInput.value.trim()) {
            return;
        }

        const message = {
            author: nameInput.value,
            content: messageInput.value
        };

        nameInput.value = '';
        messageInput.value = '';

        const options = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(message)
        };

        await Promise.all([fetch(url, options), displayMessages()]);
    }

    async function displayMessages() {
        const messages = Object.values(await loadMessages()).map(e => `${e.author}: ${e.content}`);
        messagesArea.value = messages.join('\n');
    }

    async function loadMessages() {
        const response = await fetch(url);
        return await response.json();
    }
}

attachEvents();



