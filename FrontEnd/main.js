const enrtyHolder = document.getElementById("enrtyHolder");
const date = document.getElementById("date");
const temp = document.getElementById("temp");
const weather = document.getElementById("weather");
const content = document.getElementById("content");

const APIKEY = "d386686810aa63ae62a2f2b983df92db";

document.getElementById("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const inputValue = document.getElementById("input").value;

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${APIKEY}`
    );
    const projectData = await res.json();

    if (projectData.message) {
      date.textContent = `Message: ${projectData.message}`;
      temp.textContent = ``;
      weather.textContent = ``;
      content.textContent = ``;
    } else if (!projectData.error) {
      date.textContent = "";
      temp.textContent = `Temperature: ${projectData.main.temp}° F`;
      weather.textContent = `Weather: ${projectData.weather[0].main}`;
      content.textContent = `Country: ${projectData.name}`;
    } else {
      enrtyHolder.textContent = "Loading...";
    }
  } catch (e) {
    date.textContent = `Message: Oops! Can't access API`;
    temp.textContent = ``;
    weather.textContent = ``;
    content.textContent = ``;
  }
});

// document.getElementById("form").addEventListener("submit", async (e) => {
//   e.preventDefault();
//   const inputValue = document.getElementById("input").value;

//   const res = await fetch(`http://localhost:5000?address=${inputValue}`);
//   const data = await res.json();

//   if (data.error) {
//     date.textContent = data.error;
//     temp.textContent = ``;
//     weather.textContent = ``;
//     content.textContent = ``;
//   } else if (!data.error) {
//     date.textContent = "";
//     temp.textContent = `Temperature: ${data.temperature}° F`;
//     weather.textContent = `Weather: ${data.weather}`;
//     content.textContent = `Country: ${data.country}`;
//   } else {
//     enrtyHolder.textContent = "Loading...";
//   }
// });
