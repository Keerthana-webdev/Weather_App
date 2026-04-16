const apiKey = "b08fcd0f70df0f28359adbcc2a381743";

// 🌤️ Get Weather
async function getWeather(cityInput) {
    const city = cityInput || document.getElementById("city").value;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const res = await fetch(url);
    const data = await res.json();

    if (data.cod !== 200) {
        document.getElementById("weatherResult").innerHTML = "City not found!";
        return;
    }

    displayWeather(data);
    getForecast(city);
}

// 🌡️ Display Weather
function displayWeather(data) {
    const icon = data.weather[0].icon;

    document.getElementById("weatherResult").innerHTML = `
        <h3>${data.name}</h3>
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png">
        <p>🌡️ ${Math.round(data.main.temp)}°C</p>
        <p>💧 ${data.main.humidity}%</p>
        <p>${data.weather[0].description}</p>
    `;
}

// 📅 5-Day Forecast (FIXED)
async function getForecast(city) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    const res = await fetch(url);
    const data = await res.json();

    let forecastHTML = "<h3 style='margin-top:15px;'>5-Day Forecast</h3><div class='forecast'>";

    for (let i = 0; i < 40; i += 8) {
        const item = data.list[i];

        const date = new Date(item.dt_txt);
        const day = date.toLocaleDateString("en-US", { weekday: "short" });

        const icon = item.weather[0].icon;
        const temp = Math.round(item.main.temp);

        forecastHTML += `
            <div class="forecast-card">
                <p>${day}</p>
                <img src="https://openweathermap.org/img/wn/${icon}.png">
                <p>${temp}°C</p>
            </div>
        `;
    }

    forecastHTML += "</div>";

    document.getElementById("forecast").innerHTML = forecastHTML;
}

// 📍 Location
function getLocation() {
    navigator.geolocation.getCurrentPosition(async (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;

        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

        const res = await fetch(url);
        const data = await res.json();

        displayWeather(data);
        getForecast(data.name);
    });
}

// 🌙 Dark Mode
function toggleDarkMode() {
    document.body.classList.toggle("dark");
}

// 🔍 Suggestions
document.getElementById("city").addEventListener("input", function () {
    const value = this.value;
    const cities = ["Bangalore", "Chennai", "Delhi", "Mumbai", "Hyderabad"];

    let list = "";

    cities
        .filter(city => city.toLowerCase().includes(value.toLowerCase()))
        .forEach(city => {
            list += `<li onclick="selectCity('${city}')">${city}</li>`;
        });

    document.getElementById("suggestions").innerHTML = list;
});

function selectCity(city) {
    document.getElementById("city").value = city;
    document.getElementById("suggestions").innerHTML = "";
    getWeather(city);
}