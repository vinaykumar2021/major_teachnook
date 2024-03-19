// Define constants for elements
const cityContainer = document.querySelector('.city-container');
const temperatureContainer = document.querySelector('.temperature-container');
const timeAndDateContainer = document.querySelector('.time-and-date-container');
const searchBar = document.getElementById('search');
const searchButton = document.getElementById('search-button'); // Add this line

// Function to fetch weather data
async function fetchWeatherData(cityName) {
    try {
        // Replace 'YOUR_API_KEY' with your actual API key
        const apiKey = '3f43ab17b089c07cfbe197188b147167';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

        const response = await fetch(apiUrl);
        const data = await response.json();

        return data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

// Function to update HTML with weather data
function updateWeatherData(weatherData) {
    if (!weatherData) return;

    // Update city name
    cityContainer.textContent = weatherData.name;

    // Update temperature
    temperatureContainer.innerHTML = `${weatherData.main.temp}<sup>o</sup>C`;

    // Update date and time
    const date = new Date(weatherData.dt * 1000);
    const formattedDate = date.toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    timeAndDateContainer.textContent = formattedDate;
}

// Event listener for search bar
searchButton.addEventListener('click', async (event) => { // Change to searchButton and listen for click event
    event.preventDefault(); // Prevent default form submission

    const cityName = searchBar.value.trim();
    if (cityName) {
        const weatherData = await fetchWeatherData(cityName);
        updateWeatherData(weatherData);
    }
});
