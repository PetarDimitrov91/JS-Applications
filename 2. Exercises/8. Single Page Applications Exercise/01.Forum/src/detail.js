import {createEl, request, showView} from './dom.js';

const section = document.getElementById('detailsView');
const container = section.querySelector('#postContainer');
const name = section.querySelector('.theme-name');

section.querySelector('#answerForm').addEventListener('submit', publicComment);

section.remove();

let currentTopicID = null;

export async function showDetails(topicId) {
    showView(section);
    container.replaceChildren(e('p', {}, 'Loading...'))
    name.replaceChildren();
    currentTopicID = topicId;
    await getTopic(topicId);
}

async function getTopic(id) {
    const [data, comments] = await Promise.all([
        request('http://localhost:3030/jsonstore/collections/myboard/posts/' + id),
        getAllComments(id)
    ]);

    displayTopic(data, comments);
}

function displayTopic(topic, comments) {
    name.replaceChildren(e('h2', {}, topic.title));
    container.replaceChildren(createHeader(topic));
    container.append(...comments.map(createUserComment));
}

async function publicComment(e) {
    e.preventDefault();
    const commentData = {}
    const formData = new FormData(e.target);
    for (const [name, value] of formData.entries()) {
        commentData[name] = value;
    }
    commentData['topicId'] = currentTopicID;
    commentData['time'] = new Date(Date.now());

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentData),
    }

    const data = await request('http://localhost:3030/jsonstore/collections/myboard/comments', options);
    container.append(createUserComment(data));
}

function createHeader(topic) {
    return createEl('div', {className: 'header'},
        createEl('img', {src: topic.ownerImage, alt: 'avatar'}),
        createEl('p', {},
            createEl('span', {}, topic.author),
            ' posted on ',
            createEl('time', {}, topic.time)
        ),
        createEl('p', {className: 'postContent'}, topic.text)
    );
}

function createUserComment(comment) {
    return createEl('div', {id: 'user-comment'},
        createEl('div', {className: 'topic-name-wrapper'},
            createEl('div', {className: 'topic-name'},
                createEl('p', {},
                    createEl('span', {}, comment.author),
                    ' posted on ',
                    createEl('time', {}, comment.time)
                ),
                createEl('div', {className: 'post-content'},
                    createEl('p', {}, comment.content)
                )
            )
        )
    );
}

async function getAllComments(id) {
    const allComments = await request('http://localhost:3030/jsonstore/collections/myboard/comments');
    return Object.values(allComments).filter(c => c.topicId === id);
}