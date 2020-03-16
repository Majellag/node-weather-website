const request = require('request')

const forecast = (latitude, longitude, callback) => {
    //const url = '' + latitude + ',' + longitude
    const url = 'https://api.darksky.net/forecast/b5922397be26b457fbd35fa25a9d01c5/' + latitude + ',' + longitude + '?units=si'

    request({ url, json: true }, (error, { body}) => {
        if (error) {
            callback('Unable to connect to weather service')
        } else if (body.error) {
            callback('Unable to find location')
        } else {
            callback(undefined, 'There is a ' + body.currently.precipProbability + '% of rain.' + ' The high today is ' + body.daily.data[0].temperatureHigh + ' with a low of ' + body.daily.data[0].temperatureLow)
        }
    })
}

module.exports = forecast