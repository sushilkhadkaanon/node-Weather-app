
const request = require('request')


const forecast = (lat, lon, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=a2a14a0e5fd9fd19526381be524519de&query='+lat+','+lon
    request({url, json: true}, (error, {body}) => {

        if(error){
            callback('Network Issue!', undefined)
        }else if(body.error){
            callback('Unable to find the location!', undefined)
        }else{
            
            const {weather_descriptions, temperature, feelslike} = body.current

            callback(undefined, {
                
                weather_description:weather_descriptions[0],
                temperature:temperature,
                feelslike:feelslike

            })
            
            
        }
    })

}


module.exports = forecast