const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;

const apiKey = 'b037f1d0c5651adf7aaaefe66025ab55';

const searchInput = document.querySelector("#search_city");
const searchButton = document.querySelector("#search_button");
const customIcon = document.querySelector(".custom_icon");
const info = document.querySelector(".info");
const not_found = document.querySelector(".not_found");

async function weather(city){
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if(response.status == 404 || response.status == 400){
        not_found.style.display = 'block';
        info.style.display = 'none';
    }

    const data = await response.json();
    
    document.querySelector(".city_name").innerHTML = data.name;
    document.querySelector(".weather_temp").innerHTML = Math.round(data.main.temp) + "&#8451";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";
    document.querySelector(".description").innerHTML = data.weather[0].description;

    if(data.weather[0].main == "Clear"){
        customIcon.innerHTML = "sunny";
    } else if(data.weather[0].main == "Rain"){
        customIcon.innerHTML = "rainy";
    } else if(data.weather[0].main == "Mist"){
        customIcon.innerHTML = "mist";
    } else if(data.weather[0].main == "Drizzle"){
        customIcon.innerHTML = "sprinkler";
    } else if (data.weather[0].main == "Clouds"){
        customIcon.innerHTML = "cloud";
    }

    not_found.style.display = 'none';
    info.style.display = 'block';
}

searchButton.addEventListener('click', () =>{
    weather(searchInput.value);
    searchInput.value = "";
});

searchInput.addEventListener('keydown', (e) =>{
    if(e.keyCode === 13){
        weather(searchInput.value);
        searchInput.value = "";
    }
});