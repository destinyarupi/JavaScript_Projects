// selecting all the necessary DOM elements
const liveTime = document.getElementById('time');
const liveDate = document.getElementById('date'); 
const cityName = document.querySelector('.city')
const form = document.querySelector('form');
const search = document.querySelector('input');
const button = document.querySelector('.submit');
const app = document.querySelector('.container');
const temp = document.querySelector('.temp');
const icon = document.querySelector('.icon');
const pressure = document.querySelector('.pressure-value');
const humidity = document.querySelector('.humidity-value');
const wind = document.querySelector('.wind-value');
const rain = document.querySelector('.rain-value');
const condition = document.querySelector('.weather-name');
const weather_forecast_item = document.querySelector('.weather-forecast');
const fun_message = document.querySelector('.fun-message');
const img_wrapper = document.querySelector('.img-wrapper');
const content_wrapper = document.querySelector('.content-wrapper');
const MediaQuery = matchMedia(' (min-width: 1024px) ');

// object containing all functions for geolocating users
let geocode = {
    // function to convert our geolocation to name of place using OpenCagedata API
    reverseGeocode: function(latitude, longitude) {
        // API data, call and response
        const api_key = '3f228d6a2e8d4444983e0b37eaedbd70';
        const api_url = 'https://api.opencagedata.com/geocode/v1/json'
        const request_url = api_url + '?' + 'key=' + api_key + '&q=' + encodeURIComponent(latitude + ',' + longitude) + '&pretty=1' + '&no_annotations=1';
        const request = new XMLHttpRequest();

        request.open('GET', request_url, true);

        request.onload = () => {
            if (request.status === 200){
                // Success!
                const data = JSON.parse(request.responseText);
                cityInput = data.results[0].components.state; // print the location
                weather.fetchWeatherData(cityInput)
            } 
            else if (request.status <= 500){
                // We reached our target server, but it returned an error
                console.log("unable to geocode! Response code: " + request.status);
                const data = JSON.parse(request.responseText);
                console.log('error msg: ' + data.status.message);
            } 
            else {
                // any other errors
                console.log("server error");
            }
        };

        request.onerror = function() {
            // There was a connection error of some sort
            console.log("unable to connect to server");
        };

        request.send();  // make the request
    },
    // fucntion to get user location via coordinates
    getLocation: () => {
        // if user browser supports geolocation
        if (navigator.geolocation){
            navigator.geolocation.getCurrentPosition(success, error)
        } // browser does not 
        else {
            weather.fetchWeatherData('London')
        }
        // on success
        function success (data) {
            geocode.reverseGeocode(data.coords.latitude, data.coords.longitude)
        }
        // on error (if user denies request)
        function error () {
            weather.fetchWeatherData('London')
        }
    }
};
// object containing all functions for fetching and displaying weather data
let weather = {
    // function to fetch the weather data from the api
    fetchWeatherData: function(cityInput) {
        fetch('https://api.weatherapi.com/v1/forecast.json?key=92fa6549f3cb4c7cb13144406223009&q=' + cityInput + '&days=8')
        // take the data (JSON data) and convert it tp regular JS object
        .then(response => response.json())
        .then((data) => { 
            console.log(data);
            this.displayWeatherData(data)
            app.style.opacity='1'
        })
        .catch((error) => {
                console.log(error);
                swal('No Matching Location Found.', {
                    timer:1500,
                    buttons: false
                })
            app.style.opacity = '1'
        })
    },
    // function to displat the data from the api to the page
    displayWeatherData: function(data) {
        // DOM elements 
        cityName.innerHTML = `${data.location.name}`;
        search.setAttribute('placeholder', ` ${data.location.name}`);
        temp.innerText = data.current.temp_f 
        pressure.innerText = data.current.pressure_mb + ' mb' 
        humidity.innerText = data.current.humidity + ' %'
        wind.innerText = data.current.wind_kph + ' kph' 
        rain.innerText = data.current.precip_mm + ' mm'
        condition.innerHTML = data.current.condition.text;

        // to display weather icons according to the weather conditions
        const iconId = data.current.condition.icon.substr(
            '//cdn.weatherapi.com/arupi-weather/'.length);
        icon.src = './icons/' + iconId;

        // 7 day forecast
        let dailyForecast = ''
        data.forecast.forecastday.forEach((day, index) => {
            if(index !== 0) {
                dailyForecast += 
                `<div class="weather-forecast-item">
                    <h3>${window.moment(day.date_epoch*1000).format('dddd')}</h3>
                    <small>${window.moment(day.date_epoch*1000).format('Do MMM')}</small>
                    <div class="img-container">
                        <img src="${day.day.condition.icon}" alt="weather-icon" class="icon">
                    </div>
                    <p>${day.day.mintemp_f} ~ ${day.day.maxtemp_f}&#176;F</p>
                    <div class="condition-container">
                        <h5>${day.day.condition.text}</h5>
                        <small>Wind ${day.day.maxwind_kph} kph</small>
                    </div>
                </div>`
            }
        })
        weather_forecast_item.innerHTML = dailyForecast

        // setting the background image for different weather conditions
        const code = data.current.condition.code;

        // Clear weather
        if(code == 1000) {
            // Media query to add a background image for the wrapper on mobile screens
            const ifMatchesChange = e => {
                if( e.matches ){
                    img_wrapper.style.backgroundImage = 'none'
                } 
                else {
                    img_wrapper.style.background = `url('https://media.istockphoto.com/photos/chicago-sunset-time-picture-id941021400?b=1&k=20&m=941021400&s=170667a&w=0&h=THgGUUNfJjM4NO5oQ43iF3NTybYXGLBkjogDqybQDzE=') no-repeat`                
                    img_wrapper.style.backgroundSize = `cover` 
                }
            };
            MediaQuery.addListener( ifMatchesChange );
            ifMatchesChange( MediaQuery );

            // background image for clear weather
            app.style.backgroundImage = `url('https://media.istockphoto.com/photos/chicago-sunset-time-picture-id941021400?b=1&k=20&m=941021400&s=170667a&w=0&h=THgGUUNfJjM4NO5oQ43iF3NTybYXGLBkjogDqybQDzE=')`                
            fun_message.innerHTML = 'Have a sunny day';
            // to check the time of day
            if(!data.current.is_day) {
                fun_message.innerHTML = 'Have a lovely night'
            }
            } // Cloudy weather
            else if(
                code == 1003 ||
                code == 1006 ||
                code == 1009
            ) {
                // Media query to add a background image for the wrapper on mobile screen
                const ifMatchesChange = e => {
                    if( e.matches ){
                        img_wrapper.style.backgroundImage = 'none'
                    }
                    else {
                        img_wrapper.style.background = `url('https://media.istockphoto.com/photos/cloudy-summer-landscapefield-of-ripe-wheatdark-storm-clouds-in-the-picture-id891589860?b=1&k=20&m=891589860&s=170667a&w=0&h=6xlczoSAGv-iRuU2dW30pooOyRhNGc7Q4dFSKE7DED4=')`
                        img_wrapper.style.backgroundSize = `cover`                
                    }
                };
                MediaQuery.addListener( ifMatchesChange );
                ifMatchesChange( MediaQuery );

                // background image for cloudy weather
                app.style.backgroundImage = `url('https://media.istockphoto.com/photos/cloudy-summer-landscapefield-of-ripe-wheatdark-storm-clouds-in-the-picture-id891589860?b=1&k=20&m=891589860&s=170667a&w=0&h=6xlczoSAGv-iRuU2dW30pooOyRhNGc7Q4dFSKE7DED4=')`                
                fun_message.innerHTML = "The sun always shines above the clouds";

                // to check the time of day
                if(!data.current.is_day) {
                    fun_message.innerHTML = 'Its gonna be a gloomy night'
                }
            } // Misty or foggy weather
            else if (
                code == 1030 ||
                code == 1135 ||
                code == 1147
            ) { 
                // Media query to add a background image for the wrapper on mobile screen
                const ifMatchesChange = e => {
                    if( e.matches ){
                        img_wrapper.style.backgroundImage = 'none'
                    }
                    else {
                        img_wrapper.style.backgroundImage = `url('https://images.unsplash.com/photo-1563974318767-a4de855d7b43?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjh8fHdlYXRoZXIlMjBmb2d8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60')`
                        img_wrapper.style.backgroundSize = `cover` 
                    }
                };
                MediaQuery.addListener( ifMatchesChange );
                ifMatchesChange( MediaQuery );

                // background image for misty or foggy weather
                app.style.backgroundImage = `url('https://images.unsplash.com/photo-1563974318767-a4de855d7b43?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjh8fHdlYXRoZXIlMjBmb2d8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60')`
                fun_message.innerHTML = "Look before you limp"
            } // Light & moderate rain weather
            else if(
                code == 1150 ||
                code == 1153 ||
                code == 1063 ||
                code == 1068 ||
                code == 1171 ||
                code == 1072 ||
                code == 1180 ||
                code == 1183 ||
                code == 1186 ||
                code == 1189 ||
                code == 1240 
            ) {
                // Media query to add a background image for the wrapper on mobile screen
                const ifMatchesChange = e => {
                    if( e.matches ){
                        img_wrapper.style.backgroundImage = 'none'
                    }
                    else {
                        img_wrapper.style.backgroundImage = `url('https://media.istockphoto.com/photos/rain-on-umbrella-weather-concept-picture-id1164520030?b=1&k=20&m=1164520030&s=170667a&w=0&h=AtVQLQE64xG58vKd_AW9nKN-SDcpafF9_WE4timOu7Q=')`
                        img_wrapper.style.backgroundSize = `cover`
                    }
                };
                MediaQuery.addListener( ifMatchesChange );
                ifMatchesChange( MediaQuery );

                // background image for light & moderate rain weather
                app.style.backgroundImage = `url('https://media.istockphoto.com/photos/rain-on-umbrella-weather-concept-picture-id1164520030?b=1&k=20&m=1164520030&s=170667a&w=0&h=AtVQLQE64xG58vKd_AW9nKN-SDcpafF9_WE4timOu7Q=')`
                fun_message.innerHTML = "Don't forget an umbrella"
            } // Heavy rain and thunderstorms
            else if(
                code == 1087 ||
                code == 1192 ||
                code == 1195 ||
                code == 1201 ||
                code == 1243 ||
                code == 1246 ||
                code == 1273 ||
                code == 1276 ||
                code == 1279 
            ) {
                // Media query to add a background image for the img-wrapper on mobile screen
                const ifMatchesChange = e => {
                    if( e.matches ){
                        img_wrapper.style.backgroundImage = 'none'
                    }
                    else {
                        img_wrapper.style.backgroundImage = `url('https://media.istockphoto.com/photos/cloud-storm-sky-with-thunderbolt-over-rural-landscape-picture-id1011777484?b=1&k=20&m=1011777484&s=170667a&w=0&h=XO5EQ_8QvVhj01jSbvu-sZbRIgiibaylLWO-w5VLmoo=')`
                        img_wrapper.style.backgroundSize = `cover`  
                    }
                };
                MediaQuery.addListener( ifMatchesChange );
                ifMatchesChange( MediaQuery );

                // background image for heavy rain and storm weather
                app.style.backgroundImage = `url('https://media.istockphoto.com/photos/cloud-storm-sky-with-thunderbolt-over-rural-landscape-picture-id1011777484?b=1&k=20&m=1011777484&s=170667a&w=0&h=XO5EQ_8QvVhj01jSbvu-sZbRIgiibaylLWO-w5VLmoo=')`
                fun_message.innerHTML = "There's a storm coming"
            }// Snow weather
            else {
                // Media query to add a background image for the img-wrapper on mobile screen
                const ifMatchesChange = e => {
                    if( e.matches ){
                        img_wrapper.style.backgroundImage = 'none'
                    } 
                    else {
                        img_wrapper.style.backgroundImage = `url('https://images.unsplash.com/photo-1530189443471-a7397667f448?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OTh8fHdlYXRoZXIlMjBzbm93fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60')`
                        img_wrapper.style.backgroundSize = `cover`   
                    }
                };
                MediaQuery.addListener( ifMatchesChange );    
                ifMatchesChange( MediaQuery );

                // background image for snowy weather
                app.style.backgroundImage = `url('https://images.unsplash.com/photo-1530189443471-a7397667f448?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OTh8fHdlYXRoZXIlMjBzbm93fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60')`
                fun_message.innerHTML = "Don't forget your jacket"
            }
        app.style.opacity = '1';
    },
    // function for search bar to look up different locations
    searchData: function() {
        form.addEventListener('submit', (e) => {
            // if input is empty
            if(search.value.length == 0) { 
                swal('Please enter a location.',{
                    timer: 1500,
                    buttons: false
                })
            } // fetching user's input
            else {
                cityInput = search.value;
                weather.fetchWeatherData(cityInput)
                search.value = '';
                app.style.opacity = '0';
            }
            e.preventDefault();
        })
    },
    // function for loading live time
    displayTime_Date: function() {
        //weekdays and months format saved in an array
        const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const monthsFull = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        // function for displaying time dynamically
        setInterval(() => {
            const time = new Date();
            const month = time.getMonth();
            const year = time.getFullYear()
            const day = time.getDay();
            let date = time.getDate();
            date = date < 10 ? '0'+ date : date;
            let hour = time.getHours();
            hour = hour < 10 ? '0'+ hour : hour;
            let minutes = time.getMinutes();
            minutes = minutes < 10 ? '0'+ minutes : minutes;
            const ampm = hour >= 12 ? 'PM' : 'AM';

            liveTime.innerHTML = `${hour}:${minutes} ` + `<span id="am-pm">${ampm}</span>`
            liveDate.innerText = `${weekdays[day]}, ${date} ${monthsFull[month]} ${year}`
        }, 1000);
    },
};
geocode.getLocation();
weather.searchData();
weather.displayTime_Date();

app.style.opacity = '1'