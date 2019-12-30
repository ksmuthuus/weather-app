console.log('Client Side Java Script Loaded!!')

const url = '/weather?address='

const formElement = document.querySelector('form')
const locationElement = document.querySelector('input')
const message1Element = document.querySelector('#message-1')
const message2Element = document.querySelector('#message-2')

formElement.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = locationElement.value

    message1Element.textContent = "Fetching weather....Please wait..."
    message2Element.textContent = '' //Clear existing value, if any

    fetch(url + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                message1Element.textContent = data.message
            } else {
                message1Element.textContent = data.location
                message2Element.textContent = data.message
            }
            console.log(data)
        })
    })
})