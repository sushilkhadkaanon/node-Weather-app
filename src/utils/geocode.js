
const request = require('request')


const geocode = (address,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1Ijoic3VzaGlsNTU0IiwiYSI6ImNrb3NkMjlhczAwY3kyc252c2t6YmJxdWIifQ.c4d4a_2XGF857NMLwBo1bw&limit=1'
    request({url,json: true},(error, {body} = {})=>{

        if(error){
            callback('Network Issue!', undefined)
        }else if(body.features.length===0){
            callback('Invalid Search! Try another keyword!', undefined)
        }else{
            
            callback(undefined, {
                lat: body.features[0].center[1],
                lon: body.features[0].center[0],
                location : body.features[0].place_name

            })
        }

     })
}

module.exports = geocode