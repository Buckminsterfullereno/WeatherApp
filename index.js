const container = document.querySelector(" .container");
const search = document.querySelector(" .search-box button");
const weatherBox = document.querySelector(" .weather-box");
const weatherDetails = document.querySelector(" .weather-details");
const error404 = document.querySelector(" .not-found");

search.addEventListener("click", () => {
	const APIKey = "5ee52e24f59d3e4cd13d823463b1d752";
	const city = document.querySelector(".search-box input").value;

	if (city === " ") return;

	fetch(
		`api.openweathermap.org/data/3.0/weather?q=${city}&units=imperial&appid=${APIKey}`
	)
		.then((response) => response.json())
		.then((json) => {
			if (json.cod === "404") {
				container.style.height = "400px";
				weatherBox.style.display = "none";
				weatherDetails.style.display = "none";
				error404.style.display = "block";
				error404.classList.add("fadeIn");
				return;
			}

			error404.style.display = "none";
			error404.classList.add("fadeIn");

			const image = document.querySelector(".weather-box img");
			const temperature = document.querySelector(".weather-box . temperature");
			const description = document.querySelector(".weather-box .description");
			const humidity = document.querySelector(
				".weather-details .humidity span"
			);
			const wind = document.querySelector(".weather-details .wind span");

			switch (json.weather[0].main) {
				case "Clear":
					image.src = "Images/clear.png";
					break;

				case "Clouds":
					image.src = "Images/cloud.png";
					break;
				case "Mist":
					image.src = "Images/mist.png";
					break;
				case "Rain":
					image.src = "Images/rain.png";
					break;
				case "Snow":
					image.src = "Images/snow.png";
					break;

				default:
					image.src = "";
			}

			temperature.innerHTML = `${parseInt(json.main.temp)}<span>F</span>`;
			description.innerHTML = `${json.weather[0].description}`;
			humidity.innerHTML = `${json.main.humidity}%`;
			wind.innerHTML = `${parseInt(json.wind.speed)} km/hr`;

			weatherBox.style.display = "";
			weatherDetails.style.display = "";
			weatherBox.classList.add("fadeIn");
			weatherDetails.classList.add("FadeIn");
			container.style.height = "590px";
		});
});
