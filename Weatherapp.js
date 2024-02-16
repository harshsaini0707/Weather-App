// http://api.weatherapi.com/v1/current.json?key=4312114a8eaf4fd288b165533240602&q=Roorkee&aqi=no
 


const temperature = document.getElementById("temp").querySelector('p');
const locationName = document.getElementById("location").querySelector('p');
const time = document.getElementById("time").querySelector('p');
const state = document.getElementById("region").querySelector('p');
const country = document.getElementById("country").querySelector('p');
const condition = document.getElementById("condition").querySelector('p');
const icon = document.getElementById("condition-icon").querySelector('img');
const searchPlace = document.getElementById("search");
const button = document.getElementById("search_button");

async function getResult(searchLocation) {
    try {
        const apiUrl = `http://api.weatherapi.com/v1/current.json?key=4312114a8eaf4fd288b165533240602&q=${searchLocation}&aqi=no`;
        const response = await fetch(apiUrl);
        const apiData = await response.json();
        console.log(apiData);

        const locationNameValue = apiData.location.name;
        const countryValue = apiData.location.country;
        const timeValue = apiData.location.localtime;
        const regionValue = apiData.location.region;

        const tempValue = apiData.current.temp_c;
        const conditionValue = apiData.current.condition.text;
        const conditionIconUrl = apiData.current.condition.icon;

        updateData(locationNameValue, countryValue, timeValue, regionValue, tempValue, conditionValue, conditionIconUrl);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function updateData(locationNameValue, countryValue, timeValue, regionValue, tempValue, conditionValue, conditionIconUrl) {
    locationName.innerHTML = locationNameValue;
    temperature.innerHTML = tempValue +"°C";
    time.innerHTML = timeValue;
    state.innerHTML = regionValue+" ,";
    country.innerHTML = countryValue;
    condition.innerHTML = conditionValue;
    icon.src = conditionIconUrl;
}

function searchForLocation(e) {
    e.preventDefault();
    const searchLocation = searchPlace.value;
    getResult(searchLocation);
}

button.addEventListener("click", searchForLocation);

// Initialize with default location
const defaultLocation = 'Roorkee';
getResult(defaultLocation);
