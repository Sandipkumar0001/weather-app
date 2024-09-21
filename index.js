// Define API key and base URL for fetching weather data
const apiKey = "55f1489dee43d5fd4e510006cc3172fb";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// Select the search input, button, and weather icon elements
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

// Function to fetch and display weather data
async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if (response.status == 404) { // Check if the response is 404 (city not found)
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        const data = await response.json(); // Parse the JSON data from the API
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        // Update weather icon based on the weather condition
        if (data.weather[0].main === "Clouds") {
            weatherIcon.src = "./clouds.png";
        } else if (data.weather[0].main === "Rain") {
            weatherIcon.src = "./rain.png";
        } else if (data.weather[0].main === "Mist") {
            weatherIcon.src = "./mist.png";
        } else if (data.weather[0].main === "Clear") {
            weatherIcon.src = "./clear.png";
        } else if (data.weather[0].main === "Drizzle") {
            weatherIcon.src = "./drizzle.png";
        } else if (data.weather[0].main === "Snow") {
            weatherIcon.src = "./snow.png";
        }

        document.querySelector(".weather").style.display = "block"; // Show weather details
        document.querySelector(".error").style.display = "none"; // Hide error message
    }
}

// Add event listener to the search button to fetch weather on click
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});
