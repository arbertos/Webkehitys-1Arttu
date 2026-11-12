const apiKey = "YOUR_API_KEY";

// Haetaan HTML-elementit, joita käytetään sovelluksessa.
const weatherdata = document.querySelector("#weatherdata");
const citySelect = document.querySelector("#city");
const citySearch = document.querySelector("#citysearch");
const searchButton = document.querySelector("#search");
const fetchButton = document.querySelector("#fetchWeather");

// (Alkuperäisessä pohjassa isEnglish-muuttujaa ei ollut määritelty,
// mikä aiheutti ReferenceErrorin catch-lohkossa.)
const isEnglish = document.documentElement.lang === "en";

// Hakee säätiedot annetulle kaupungille ja näyttää ne sivulla.
// async mahdollistaa await-sanan käytön funktion sisällä.
async function getWeather(city) {

    // Näytetään latausviesti.
    weatherdata.textContent = isEnglish ? "Loading weather data..." : "Ladataan säätietoja...";

    try {
        // Lähetetään GET-pyyntö rajapintaan.
        // q = kaupunki, units=metric = celsiusasteet, mode=xml = vastaus XML-muodossa.
        // encodeURIComponent huolehtii esim. välilyönneistä ("New York").
        const url = "https://api.openweathermap.org/data/2.5/weather"
            + "?q=" + encodeURIComponent(city)
            + "&units=metric&mode=xml"
            + "&lang=" + (isEnglish ? "en" : "fi")
            + "&appid=" + apiKey;

        const response = await fetch(url);

        // Luetaan vastaus tekstinä ja muutetaan se XML-dokumentiksi.
        const xmlText = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, "application/xml");

        // Tarkistetaan, palauttiko rajapinta virheen (esim. 404 = kaupunkia ei löydy,
        // 401 = virheellinen API-avain).
        if (!response.ok) {
            const apiMessage = xmlDoc.querySelector("message");
            let errorText = "HTTP error: " + response.status;
            if (apiMessage) {
                errorText += " (" + apiMessage.textContent + ")";
            } else {
                // Joskus virhe tulee JSON-muodossa, yritetään lukea sekin.
                try {
                    errorText += " (" + JSON.parse(xmlText).message + ")";
                } catch (e) {
                    // Ei tehdä mitään, käytetään pelkkää statuskoodia.
                }
            }
            throw new Error(errorText);
        }

        // Tarkistetaan, että XML saatiin parsittua.
        if (xmlDoc.querySelector("parsererror")) {
            throw new Error("XML parsing failed");
        }

        // Parsitaan haluamamme tiedot XML:stä.
        const cityName = xmlDoc.querySelector("city").getAttribute("name");
        const country = xmlDoc.querySelector("country").textContent;
        const temperature = xmlDoc.querySelector("temperature").getAttribute("value");
        const feelsLike = xmlDoc.querySelector("feels_like").getAttribute("value");
        const humidity = xmlDoc.querySelector("humidity").getAttribute("value");
        const pressure = xmlDoc.querySelector("pressure").getAttribute("value");
        const windSpeed = xmlDoc.querySelector("wind speed").getAttribute("value");
        const clouds = xmlDoc.querySelector("clouds").getAttribute("value");
        const description = xmlDoc.querySelector("weather").getAttribute("value");
        const icon = xmlDoc.querySelector("weather").getAttribute("icon");
        const lastUpdate = xmlDoc.querySelector("lastupdate").getAttribute("value");

        // Tulostetaan tiedot diviin.
        // Tyhjennetään ensin vanha sisältö.
        weatherdata.innerHTML = "";

        const heading = document.createElement("h3");
        heading.textContent = cityName + ", " + country;
        weatherdata.appendChild(heading);

        const img = document.createElement("img");
        img.src = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
        img.alt = description;
        weatherdata.appendChild(img);

        // Rivit: [otsikko suomeksi, otsikko englanniksi, arvo]
        const rows = [
            ["Sää", "Weather", description],
            ["Lämpötila", "Temperature", Math.round(temperature) + " °C"],
            ["Tuntuu kuin", "Feels like", Math.round(feelsLike) + " °C"],
            ["Pilvisyys", "Cloudiness", clouds + " %"],
            ["Ilmankosteus", "Humidity", humidity + " %"],
            ["Ilmanpaine", "Pressure", pressure + " hPa"],
            ["Tuuli", "Wind", windSpeed + " m/s"],
            ["Päivitetty (UTC)", "Updated (UTC)", lastUpdate.replace("T", " ")]
        ];

        const list = document.createElement("ul");
        rows.forEach(function (row) {
            const li = document.createElement("li");
            const label = document.createElement("b");
            label.textContent = (isEnglish ? row[1] : row[0]) + ": ";
            li.appendChild(label);
            // textContent estää sen, että vastauksen sisältö tulkittaisiin HTML:ksi.
            li.appendChild(document.createTextNode(row[2]));
            list.appendChild(li);
        });
        weatherdata.appendChild(list);

    // Käsitellään pyynnön ja yllä olevan koodin virheet.
    } catch (error) {
        const message = isEnglish
            ? "Failed to fetch weather data: "
            : "Säätietojen haku epäonnistui: ";

        weatherdata.textContent = message + error.message;
        console.error(error);
    }
}

// "Hae data" -painike: hakee pudotusvalikossa valittuna olevan kaupungin säätiedot.
fetchButton.addEventListener("click", function () {
    getWeather(citySelect.value);
});

// Pudotusvalikon change-tapahtuma: haetaan heti valitun kaupungin säätiedot.
citySelect.addEventListener("change", function () {
    getWeather(citySelect.value);
});

// Hakukenttä: "Hae"-painike hakee kirjoitetun kaupungin säätiedot.
function searchCity() {
    const city = citySearch.value.trim();
    if (city === "") {
        weatherdata.textContent = isEnglish
            ? "Please type a city name."
            : "Kirjoita kaupungin nimi.";
        return;
    }
    getWeather(city);
}

searchButton.addEventListener("click", searchCity);

// Haku käynnistyy myös Enter-näppäimellä.
citySearch.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        searchCity();
    }
});