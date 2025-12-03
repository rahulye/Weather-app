
import {userAPI, apiURL} from './config.js';

async function callAPI() {
  const cityName = document.querySelector('.js-input').value;

   if (!cityName.trim()) {
     document.querySelector('.js-error').style.display = "flex"
    setTimeout( () => {
      document.querySelector('.js-error').style.display = "none"
    },1500);
    return; 
  };

  const request = await fetch( apiURL + `&appid=${userAPI}&q=${cityName}`);
  
  if ( request.status === 404 || request.status === 400) {
    document.querySelector('.js-error').style.display = "flex"
    setTimeout( () => {
      document.querySelector('.js-error').style.display = "none"
    },1500);
    document.querySelectorAll('.hero-section, .bottom-section, .wind-cont, .humd-cont').forEach( (element) => {
      element.style.display = "none";
    });
    return;
  } else {
    document.querySelector('.js-error').style.display = "none"; 
    try {  
      const value = await request.json();
      document.querySelector('.js-cityName').innerHTML = value.name;
      document.querySelector('.js-cityTemp').innerHTML = Math.round(value.main.temp) + '°C';
      document.querySelector('.js-humidity').innerHTML = value.main.humidity + '%';
      document.querySelector('.js-windSpeed').innerHTML = value.wind.speed + ' km/h';
  
      const condition = value.weather[0].main.toLowerCase();
      const weatherElement = document.querySelector('.js-weather');
  
      switch (condition) {
        case 'clouds':   weatherElement.src = 'images/clouds.png'; break;
        case 'clear':    weatherElement.src = 'images/clear.png'; break;
        case 'drizzle':  weatherElement.src = 'images/drizzle.png'; break;
        case 'mist':     weatherElement.src = 'images/mist.png'; break;
        case 'rain':     weatherElement.src = 'images/rain.png'; break;
        case 'snow':     weatherElement.src = 'images/snow.png'; break;
      };

      localStorage.setItem( 'loadCityName' , value.name);
      
      document.querySelectorAll('.hero-section, .bottom-section, .wind-cont, .humd-cont').forEach( (element) => {
        element.style.display = 'flex';
      });
    } catch {
        alert('Server error try again later');
      };
  }
};

document.querySelector('.js-btn').addEventListener( 'click' , callAPI );

window.addEventListener( 'keydown' , (event)=> {
  if(event.key === 'Enter') {
    callAPI();
  };
});

window.addEventListener( 'load' , () => {
  const loadCityName = localStorage.getItem('loadCityName');
  if(loadCityName) {
    document.querySelector('.js-input').value = loadCityName;
    callAPI();
  };
});