function attachEvents() {
    const forecast = document.getElementById('forecast');
    const currentForecastLabel = document.querySelector('#forecast #current .label');
    const upcomingForecastLabel = document.querySelector('#forecast #upcoming .label');
    const upcomingSection = document.getElementById('upcoming');
    const currentSection = document.getElementById('current');
    const locationInput = document.getElementById('location');
    const submitBtn = document.getElementById('submit');

    /*
         Sunny			&#x2600; // ☀
         Partly sunny	&#x26C5; // ⛅
         Overcast		&#x2601; // ☁
         Rain			&#x2614; // ☂
         Degrees		&#176;   // °
    */

    const conditionChecker = {
        'Sunny'() {
            return '&#x2600';
        },
        'Partly sunny'() {
            return '&#x26C5';
        },
        'Overcast'() {
            return '&#x2601';
        },
        'Rain'() {
            return '&#x2614';
        },
        'Degrees'() {
            return '&#176';
        }
    }

    submitBtn.addEventListener('click', fetchWeatherData);

    async function fetchWeatherData() {
        submitBtn.disabled = true;

        const currentForecasts = document.querySelector('.forecasts');
        const upcomingForecast = document.querySelector('.forecasts-info');
        const url = 'http://localhost:3030/jsonstore/forecaster/locations';

        if (currentForecasts) {
            currentForecasts.replaceWith();
            upcomingForecast.replaceWith();
        }

        forecast.style.display = 'none';
        upcomingSection.style.display = ''
        currentForecastLabel.textContent = 'Loading...';
        upcomingForecastLabel.textContent = 'Loading...';

        try {
            const response = await fetch(url);
            const data = await response.json();
            const [searchedLocation] = data.filter(e => e.name.toLowerCase() === locationInput.value.toLowerCase());

            locationInput.value = '';

            if (searchedLocation === undefined || response.status !== 200) {
                throw new Error('Error')
            }
            forecast.style.display = 'block';
            await Promise.all([showTodayForecast(searchedLocation), showUpcomingForecast(searchedLocation)]);
        } catch (e) {
            forecast.style.display = '';
            currentForecastLabel.textContent = e.message;
            console.log(e.message);
            upcomingSection.style.display = 'none';
        }
        submitBtn.disabled = false;
    }

    async function showTodayForecast(searchedLocation) {
        const url = `http://localhost:3030/jsonstore/forecaster/today/${searchedLocation.code}`;

        const response = await fetch(url);
        const data = await response.json();

        currentForecastLabel.textContent = 'Current conditions';

        const {forecast: {condition, high, low}} = data;
        const cityLocation = data.name;

        let conditionCode = conditionChecker[condition]();

        const todayForecast = create('div', {className: 'forecasts'},
            create('span', {className: 'condition symbol'}, conditionCode),
            create('span', {className: 'condition'},
                create('span', {className: 'forecast-data'}, cityLocation),
                create('span', {className: 'forecast-data'}, `${low}${conditionChecker['Degrees']()}/${high}${conditionChecker['Degrees']()}`),
                create('span', {className: 'forecast-data'}, condition)
            ));

        currentSection.appendChild(todayForecast);
    }

    async function showUpcomingForecast(searchedLocation) {
        const url = `http://localhost:3030/jsonstore/forecaster/upcoming/${searchedLocation.code}`;

        const response = await fetch(url);
        const data = await response.json();

        upcomingForecastLabel.textContent = 'Three-day forecast';

        let upcomingForecast = document.createElement('div');
        upcomingForecast.className = 'forecasts-info';

        for (let day = 1; day <= data['forecast'].length; day++) {
            const {condition, high, low} = data['forecast'][day - 1];
            const conditionCode = conditionChecker[condition]();

            const currentDayForecast = create('span', {className: 'upcoming'},
                create('span', {className: 'symbol'}, conditionCode),
                create('span', {className: 'forecast-data'}, `${low}${conditionChecker['Degrees']()}/${high}${conditionChecker['Degrees']()}`),
                create('span', {className: 'forecast-data'}, condition)
            );
            upcomingForecast.appendChild(currentDayForecast);
        }
        upcomingSection.appendChild(upcomingForecast);
    }

    function create(type, attributes, ...content) {
        const element = document.createElement(type);

        for (const property in attributes) {
            element[property] = attributes[property];
        }

        for (let el of content) {
            if (typeof el === 'string' || typeof el === 'number') {
                if (el.startsWith('&') || Number.isInteger(Number(el[0]))) {
                    element.innerHTML = el;
                    continue;
                }
                el = document.createTextNode(el);
            }
            element.appendChild(el);
        }
        return element
    }
}

attachEvents();

