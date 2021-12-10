const express = require("express");
const request = require("request");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// TO PREVENT CORS Header
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

const APIKEY = "d386686810aa63ae62a2f2b983df92db";

const getWeather = (country, callback) => {
  const baseURL = `https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${APIKEY}`;

  request(
    {
      url: baseURL,
      json: true,
    },
    (err, res) => {
      // Low Level Errors: Can't Access API
      if (err) {
        return callback("Can't access this API", undefined);
      } else if (res.body.message) {
        return callback(`Oops: ${res.body.message}`, undefined);
      }
      const projectData = res.body;
      callback(undefined, projectData);
    }
  );
};

app.get("/", (req, res) => {
  getWeather(req.query.address, (err, data) => {
    if (!req.query.address) return res.send({ error: err });
    if (err) return res.send({ error: err });
    res.send({
      country: data.sys.country,
      temperature: data.main.temp,
      feels: data.main.feels_like,
      weather: data.weather[0].main,
    });
  });
});

app.listen(PORT, () => console.log(`Your server is running on Port: ${PORT}`));
