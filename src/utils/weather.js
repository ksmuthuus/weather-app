const request = require('request')

const accessToken = process.env.WEATHER_DARKSKY_KEY
const weather = (lat, lang, callback) => {
    if (!accessToken)
        callback('Unable to get weather', undefined)

    const url = `https://api.darksky.net/forecast/${accessToken}/${lat},${lang}`
    request({
        uri: url,
        json: true
    }, (error, response) => {
        if (error) {
            callback('Unable to connect to source service!', undefined)
        } else if (response.error) {
            callback('Unable to fetch weather', undefined)
        } else {
            const data = {
                summary: response.body.hourly.summary,
                temp: response.body.currently.temperature,
                rain: response.body.currently.precipProbability
            }
            callback(undefined, data)
        }
    })
}


module.exports = weather