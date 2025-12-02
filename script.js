
import {userAPI, apiURL} from './config.js';

async function callAPI() {
  const cityName = document.querySelector('.js-input').value;
  const request = await fetch( apiURL + `&appid=${userAPI}&q=${cityName}`);
  
  if ( request.status === 404) {
    document.querySelector('.js-error').style.display = "flex";
    document.querySelectorAll('.hero-section, .bottom-section, .wind-cont, .humd-cont').forEach( (element) => {
      element.style.display = "none";
    });
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
  
      if (condition === 'clouds') {
        weatherElement.src = 'images/clouds.png';
      }
      else if (condition === 'clear') {
        weatherElement.src = 'images/clear.png';
      }
      else if (condition === 'drizzle') {
        weatherElement.src = 'images/drizzle.png';
      }
      else if (condition === 'mist') {
        weatherElement.src = 'images/mist.png';
      }
      else if (condition === 'rain') {
        weatherElement.src = 'images/rain.png';
      }
      else if (condition === 'snow') {
        weatherElement.src = 'images/snow.png';
      };
      
      document.querySelectorAll('.hero-section, .bottom-section, .wind-cont, .humd-cont').forEach( (element) => {
        element.style.display = 'flex';
      });
    } catch {
        alert('Server error try again later');
      };
  }
};

document.querySelector('.js-btn').addEventListener( 'click' , callAPI );

window.addEventListener( 'keypress' , (event)=> {
  if(event.key === 'Enter') {
    callAPI();
  };
});