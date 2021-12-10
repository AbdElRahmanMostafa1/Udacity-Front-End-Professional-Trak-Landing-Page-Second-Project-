// IN CASE TO ORDER FUNCTIONALITY BUT NOT REQUIRED IN THE RUBRIC

const request = require("request");

const weatherApiKey = "d386686810aa63ae62a2f2b983df92db";

const getWeather = (country, callback) => {
  const baseURL = `https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${weatherApiKey}`;

  request(
    {
      url: baseURL,
      json: true,
    },
    (err, res) => {
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

module.exports = getWeather;
