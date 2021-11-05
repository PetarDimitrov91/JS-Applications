async function lockedProfile() {
    const mainSectionRef = document.getElementById('main');
    document.querySelector('#main .profile').replaceWith();

    await loadProfiles();

    function showInfo(event) {
        const profile = event.target.parentNode;
        const unlockRadio = profile.querySelector('input[type="radio"][value="unlock"]');
        const lockedRadio = profile.querySelector('input[type="radio"][value="lock"]');
        const button = event.target;

        lockedRadio.addEventListener('click', () => {
            if (lockedRadio.checked === true) {
                profile.querySelector('div').style.display = 'none';
                button.textContent = 'Show more';
            }
        });

        if (event.target.textContent === 'Show more' && unlockRadio.checked === true) {
            profile.querySelector('div').style.display = 'inline-block';
            button.textContent = 'Hide';
        } else if (event.target.textContent === 'Hide') {
            profile.querySelector('div').style.display = 'none';
            button.textContent = 'Show more';
        }
    }

    async function loadProfiles() {
        const url = 'http://localhost:3030/jsonstore/advanced/profiles';
        const response = await fetch(url);
        const data = await response.json();

        let profileCount = 1;
        for (const profile in data) {
            const profileElement = create('div', {className: 'profile'},
                create('img', {
                    src: './iconProfile2.png',
                    className: 'userIcon'
                }),
                create('label', {}, 'Lock'),
                create('input', {
                    type: 'radio',
                    name: `user${profileCount}Locked`,
                    value: 'lock',
                    checked: true
                }),
                create('label', {}, 'Unlock'),
                create('input', {
                    type: 'radio',
                    name: `user${profileCount}Locked`,
                    value: 'unlock',
                    checked: false
                }),
                create('hr', {}),
                create('label', {}, 'Username'),
                create('input', {
                    type: 'text',
                    name: `user${profileCount}Username`,
                    value: data[profile]['username'],
                    disabled: true,
                    readOnly: true
                }),
                create('div', {id: `user${profileCount}HiddenFields`},
                    create('hr', {}),
                    create('label', {}, 'Email'),
                    create('input', {
                        type: 'email',
                        name: `user${profileCount}Email`,
                        value: data[profile]['email'],
                        disabled: true,
                        readOnly: true
                    }),
                    create('label', {}, 'Age'),
                    create('input', {
                        type: 'email',
                        name: `user${profileCount}Age`,
                        value: data[profile]['age'],
                        disabled: true,
                        readOnly: true
                    }),
                ),
                create('button', {}, 'Show more')
            );
            profileCount++;
            profileElement.getElementsByTagName('button')[0].addEventListener('click', showInfo);
            mainSectionRef.appendChild(profileElement);
        }
    }

    function create(type, attributes, ...content) {
        const element = document.createElement(type);

        for (const property in attributes) {
            element[property] = attributes[property];
        }

        for (let el of content) {
            if (typeof el === 'string' || typeof el === 'number') {
                el = document.createTextNode(el);
            }
            element.appendChild(el);
        }
        return element
    }
}