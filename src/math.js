// const calculateTip = (total, tipPercent) => {
//     const tip = total * tipPercent
//     return total + tip
// }

const calculateTip = (total, tipPercent = .25) => total + (total * tipPercent)

// Mqs ne kalojme nga funskioni par ne te dytin, normalisht lind nevoja te kuptojme kemi apo jo gabime,
// andaj i testojme me testet, dhe prandaj ato jan kaqe te nevojshme se lehtesojne pune dhe min time.
// Kjo sjell flexibility

const fahrenheitToCelsius = (temp) => {
    return (temp - 32) / 1.8
}

const celsiusToFahrenheit = (temp) => {
    return (temp * 1.8) + 32
}

const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (a < 0 || b < 0) {
                return reject('Numbers must be positive!')
            }

            resolve(a + b)
        }, 2000)
    })
}


module.exports = {
    calculateTip,
    fahrenheitToCelsius,
    celsiusToFahrenheit,
    add
}