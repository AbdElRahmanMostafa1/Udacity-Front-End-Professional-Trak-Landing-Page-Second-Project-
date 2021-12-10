const enrtyHolder = document.getElementById("enrtyHolder");
const date = document.getElementById("date");
const temp = document.getElementById("temp");
const weather = document.getElementById("weather");
const content = document.getElementById("content");

document.getElementById("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const inputValue = document.getElementById("input").value;

  const res = await fetch(`http://localhost:5000?address=${inputValue}`);
  const data = await res.json();

  if (data.error) {
    date.textContent = data.error;
    temp.textContent = ``;
    weather.textContent = ``;
    content.textContent = ``;
  } else if (!data.error) {
    date.textContent = "";
    temp.textContent = `Temperature: ${data.temperature}° F`;
    weather.textContent = `Weather: ${data.weather}`;
    content.textContent = `Country: ${data.country}`;
  } else {
    enrtyHolder.textContent = "Loading...";
  }
});
