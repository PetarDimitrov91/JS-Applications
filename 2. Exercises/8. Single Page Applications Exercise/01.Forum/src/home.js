import {showDetails} from './detail.js';
import {createEl, request, showView} from './dom.js';

const section = document.getElementById('homeView');
const topics = section.querySelector('#topicContainer');
const topicForm = section.querySelector('form');
const postBtn = topicForm.querySelector('.public')
const cancelBtn = topicForm.querySelector('.cancel')

postBtn.addEventListener('click', publicTopic);
cancelBtn.addEventListener('click', cancelTopic);

section.remove();

export async function showHome() {
    showView(section);
    topics.replaceChildren(e('p', {}, 'Loading...'))
    await getTopics();
}

async function getTopics() {
    const data = await request('http://localhost:3030/jsonstore/collections/myboard/posts');
    topics.replaceChildren(...Object.values(data).map(createTopicCard));
}

async function publicTopic(e) {
    e.preventDefault();
    const formData = new FormData(topicForm);
    const newTopicData = {};

    for (const [name, value] of formData.entries()) {
        if (value === '') {
            alert('Fill all Fields!');
            return;
        }
        newTopicData[name] = value;
    }

    newTopicData['time'] = new Date(Date.now());
    newTopicData['ownerImage'] = './static/profile.png';

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTopicData)
    }

    const data = await request('http://localhost:3030/jsonstore/collections/myboard/posts', options);
    topics.appendChild(createTopicCard(data));

    topicForm.reset();
}

function cancelTopic(e) {
    e.preventDefault();
    topicForm.reset();
}

function createTopicCard(topic) {
    const topicTitle =
        createEl('a', { className: 'normal', href: topic.title },
            createEl('h2', {}, topic.title)
        );

    topicTitle.addEventListener('click', async (e) => {
        e.preventDefault();
        await showDetails(topic['_id']);
    });

    return createEl('div', {className: 'topic-name-wrapper'},
        createEl('div', {className: 'topic-name'},
            topicTitle,
            createEl('div', {className: 'columns'},
                createEl('p', {},
                    'Date: ',
                    createEl('time', {}, topic.time)
                ),
                createEl('div', {className: 'nick-name'},
                    createEl('p', {},
                        'Username: ',
                        createEl('span', {}, topic.author)
                    )
                )
            )
        )
    );
}