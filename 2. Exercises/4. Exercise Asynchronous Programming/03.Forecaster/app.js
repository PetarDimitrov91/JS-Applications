function attachEvents() {
    const divForecast = document.getElementById('forecast');
    const forecastDisplay = document.querySelector('#forecast #current .label');
    const upcomingForecast = document.getElementById('upcoming');
    const currentForecast = document.getElementById('current');
    const locationInput = document.getElementById('location');
    const submitBtn = document.getElementById('submit');

    submitBtn.addEventListener('click', fetchWeatherData);

    async function fetchWeatherData() {
        const forecastsDiv = document.querySelector('.forecasts');
        const url = 'http://localhost:3030/jsonstore/forecaster/locations';

        if (forecastsDiv) {
            forecastsDiv.replaceWith();
        }

        divForecast.style.display = 'none';
        upcomingForecast.style.display = ''
        forecastDisplay.textContent = 'Current conditions';

        try {

            const response = await fetch(url);
            const data = await response.json();

            const [searchedLocation] = data.filter(e => e.name.toLowerCase() === locationInput.value.toLowerCase());
            locationInput.value = '';

            if (searchedLocation === undefined || response.status !== 200) {
                throw new Error('Error')
            }

            divForecast.style.display = 'block';
            await showTodayForecast(searchedLocation);
            await showUpcomingForecast(searchedLocation);

        } catch (e) {
            divForecast.style.display = '';
            forecastDisplay.textContent = e.message;
            console.log(e.message);
            upcomingForecast.style.display = 'none';
        }
    }

    async function showTodayForecast(searchedLocation) {
        const url = `http://localhost:3030/jsonstore/forecaster/today/${searchedLocation.code}`;

        const response = await fetch(url);
        const data = await response.json();

        const {forecast: {condition, high, low}} = data;
        const cityLocation = data.name;

        let conditionCode;

        /*Sunny			&#x2600; // ☀
         Partly sunny	&#x26C5; // ⛅
         Overcast		&#x2601; // ☁
         Rain			&#x2614; // ☂
         Degrees		&#176;   // °
*/
        switch (condition) {
            case 'Sunny':
                conditionCode = '&#x2600';
                break;
            case  'Partly sunny':
                conditionCode = '&#x26C5';
                break;
            case 'Overcast':
                conditionCode = '&#x2601';
                break;
            case 'Rain':
                conditionCode = '&#x2614';
                break;
        }

        const todayForecast = create('div', {className: 'forecasts'},
            create('span', {className: 'condition symbol'}),
            create('span', {className: 'condition'},
                create('span', {className: 'forecast-data'}, cityLocation),
                create('span', {className: 'forecast-data'}),
                create('span', {className: 'forecast-data'}, condition)
            ));

        currentForecast.appendChild(todayForecast);

        //adding the special symbols to the document using innerHTML because the factory function needs to be extended
        document.querySelector('#forecast .forecasts .condition').innerHTML = conditionCode;
        document.querySelectorAll('#forecast .forecasts .forecast-data')[1].innerHTML = `${low}&#176/${high}&#176`;

    }

    async function showUpcomingForecast(searchedLocation) {
        const url = `http://localhost:3030/jsonstore/forecaster/upcoming/${searchedLocation.code}`;

        const response = await fetch(url);
        const data = await response.json();

        console.log(data);
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

attachEvents();

