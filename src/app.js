const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const weather = require('./utils/weather')

const app = express()

//Configure paths
const staticDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//Configure handlebar engine
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Configure static filepath
app.use(express.static(staticDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Home',
        author: 'Muthu'
    })
})

app.get('/help', (req, res) => {
    res.render('Help', {
        title: 'Help',
        author: 'Muthu',
        content: 'this is a help content'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        author: 'Muthu'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address

    if (!address) {
        return res.send({
            error: 'ValidationError',
            message: 'Address is required'
        })
    }

    geocode(address, (error, {
        lat,
        lang,
        place
    } = {}) => {
        if (error) {
            return res.send({
                error: 'OperationalError',
                message: error
            })
        }
        weather(lat, lang, (error, {
            summary,
            temp,
            rain
        }) => {
            if (error) {
                res.send({
                    error: 'OperationalError',
                    message: error
                })
            }
            res.send({
                location: place,
                summary: summary,
                message: summary + ' The temp is ' + temp + ' F.  There is ' + rain * 100 + '% chances for rain'
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 'Error 404',
        message: 'Help content not available!',
        author: 'Muthu'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: 'Error 404',
        message: 'Page not found',
        author: 'Muthu'
    })
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log('Listening on port ', port)
})