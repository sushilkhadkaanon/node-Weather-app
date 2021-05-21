const express = require('express')
const { join } = require('path')
const path = require('path')
const hbs = require('hbs')
const { exists } = require('fs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

const app = express()
const port = process.env.PORT || 3000


app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)


app.use(express.static(publicDirectoryPath))



app.get('',(req,res)=>{

    res.render('index',{
        title: 'Weather App',
        name: 'Sushil'
    })

})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help Page',
        name: 'Sushil'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Page',
        name: 'Sushil'
    })
})


app.get('/weather',(req, res)=>{


    if(!req.query.address){
        return res.send({
            error: 'No address provided!'
        })
    }


    const address = req.query.address

    geocode(address, (error, {lat, lon, location}={}) => {
        if (error) {
            return res.send({
                error: error
            })
        }

        forecast(lat, lon, (forecastError, {weather_description, temperature, feelslike, humidity, cloudcover}={}) => {
            if (forecastError) {
                return res.send({
                    error: forecastError
                })
            }

            res.send({
                location: location,
                weather_description: weather_description,
                temperature: temperature,
                feelslike: feelslike,
                humidity: humidity,
                cloudcover: cloudcover
                
            })
      

        })
    })






})



app.get('/products',(req,res)=>{
    console.log(req.query)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req, res)=>{
    res.render('pageNotFound',{
        title: '404',
        name: 'Sushil',
        errorMessage: 'Help Not found!'
    })
})

app.get('*',(req,res)=>{
    res.render('pageNotFound',{
        title: '404',
        name: 'Sushil',
        errorMessage: 'Page Not Found!'
    })
})

app.listen(port, ()=>{
    console.log('Server started on port '+port)
})