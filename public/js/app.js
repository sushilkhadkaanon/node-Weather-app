console.log('Client side javascript loaded in browser....')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const result1 = document.querySelector('#result1')
const result2 = document.querySelector('#result2')
const result3 = document.querySelector('#result3')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value

    result1.textContent = 'Loading weather data.... '
    result2.textContent = ''
    result3.textContent = ''
    const queryString = '/weather?address=' + location
    fetch(queryString).then((response) => {

        response.json().then((data) => {
            if (data.error) {

                result1.textContent = 'Error '
                result2.textContent = data.error
            } else {

                result1.textContent = data.location + '- Forecast: ' + data.weather_description
                result2.textContent = 'It is currently ' + data.temperature + ' degrees. But feels like ' + data.feelslike + ' degrees out.'
                result3.textContent = 'Humidity : '+data.humidity+'   &     CloudCover : '+data.cloudcover
            }
        })

    })

})



