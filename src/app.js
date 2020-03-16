const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000


// Define paths for express config
console.log(__dirname)
const publicDescriptionPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Set up handler bars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDescriptionPath))

app.get('', (req, res) => {
    res.render('index',{
    title:'Weather App',
    name: 'Majella'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
    title:'About me',
    name: 'Majella'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
    helpText:'This is some helpful info',
    title: 'Help',
    name: 'Majella'
    })
})

// app.com
/*app.get( '', (req, res) => {
    res.send('<h1>Weather</h1>')
})

// app.com/help
app.get( '/help', (req, res) => {
    res.send([{
        name: 'Andrew',
    },{
        name: 'Majella'
    }])
})

// app.com/about
app.get( '/about', (req, res) => {
    res.send('<h1>About</h1>')
})*/

// app.com/weather
app.get( '/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location } = {}) => {
        if(error) {
            return res.send({ error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({ error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
    
        })

    })
    /*res.send({
        forecast: 'It is snowing',
        location: 'Philadelphia',
        address: req.query.address
    })*/
})

app.get( '/products', (req, res) => {
if(!req.query.search){
    return res.send({
        error: "You must provide a search term"
    })
}

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get( '/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name:'Majella',
        errorMessage: 'Help Article not found'
    })
})

app.get( '*', (req, res) => {
    res.render('404', {
        title: '404',
        name:'Majella',
        errorMessage: 'Page not found'
    })
})



app.listen(port ,() => {
    console.log('Server is up on port ' + port)
})