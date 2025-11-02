let weatherForm = document.querySelector(".weatherForm");
let inputCity = document.querySelector(".inputCity");
// let buttonSubmit = document.querySelector(".buttonSubmit");
let card= document.querySelector(".card");
const apiKey = "99c6486d1e02456231d88c475a058eab";

weatherForm.addEventListener("submit", async event => {

    event.preventDefault();

    let city = inputCity.value;

    if(city){

        try{
            const weatherData = await getWeatherData(city);
            displyWeatherdata(weatherData);

        }catch(error){
            console.error(error);
            displayError(error)
        }

    }else{
        displayError("Masukan Nama Kota");
    }
});

async function getWeatherData(city){

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const respose = await fetch(apiUrl);
    if(!respose.ok){
        throw new Error("Data Tidak di Temukan");
    }

    return respose.json();
};

function displyWeatherdata(data){


    console.log(data)
    const {name: city, main: {temp, humidity}, weather: [{description, id}]} = data;
   
    card.textContent = "";
    card.style.display= "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const WeatherEmoji = document.createElement("p");

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}C`;
    humidityDisplay.textContent = `Kelembapan : ${humidity}%`;
    descDisplay.textContent = description ;
    WeatherEmoji.textContent = getWeatherEmoji(id);


    // cityDisplay.classList.add("")
    tempDisplay.classList.add("suhu");
    humidityDisplay.classList.add("kelembapan");
    descDisplay.classList.add("cuaca");
    WeatherEmoji.classList.add("emoji")


    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(WeatherEmoji);
    card.appendChild(WeatherEmoji);

};

function getWeatherEmoji(weatherid){

    switch(true){
        case (weatherid >= 200 && weatherid < 300):
        return "⛈️";
        case (weatherid >= 300 && weatherid < 400):
        return "☔";
        case (weatherid >= 400 && weatherid < 500):
        return "🌨️";
        case (weatherid >= 500 && weatherid < 600):
        return "😶‍🌫️";
        case (weatherid === 800):
        return "☀️";
        case (weatherid >= 801 && weatherid < 810):
        return "☁️";
        default : 
        return "❓"
    }
};

function displayError(massage){
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent= massage;
    errorDisplay.classList.add("error");

    card.textContent = "";
    card.style.display = "flex" ;
    card.appendChild(errorDisplay);
};
