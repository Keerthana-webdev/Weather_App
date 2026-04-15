async function getWeather() {
    const city = document.getElementById("city").value;
    const apiKey = "b08fcd0f70df0f28359adbcc2a381743"; 

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        console.log(data);

        if (data.cod !== 200) {
            document.getElementById("weatherResult").innerHTML =
                "❌ Error: " + data.message;
            return;
        }

        const temp = data.main.temp;
        const humidity = data.main.humidity;
        const weather = data.weather[0].description;

        document.getElementById("weatherResult").innerHTML = `
            <h3>${city}</h3>
            <p>🌡️ Temperature: ${temp}°C</p>
            <p>💧 Humidity: ${humidity}%</p>
            <p>☁️ Condition: ${weather}</p>
        `;

    } catch (error) {
        console.log(error);
        document.getElementById("weatherResult").innerHTML =
            "⚠️ Something went wrong!";
    }
}