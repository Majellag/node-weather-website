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
            callback(undefined, body.currently.precipProbability + '% of rain' )
        }
    })
}

module.exports = forecast