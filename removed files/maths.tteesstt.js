// const { calculateTip, fahrenheitToCelsius, celsiusToFahrenheit, add } = require('../src/math')

// test('Should calculate total with tip', () => {
//     const total = calculateTip(10, .3)
//     expect(total).toBe(13) //toBe checks for equality

// })

// test('Should calculate total with default Tip value', () => {
//     const total = calculateTip(10)
//     expect(total).toBe(12.5)
// })

// test('Should convert 32 F to 0 C', () => {
//     const temp = fahrenheitToCelsius(32)
//     expect(temp).toBe(0)
// })

// test('Should convert 0 C to 32 F', () => {
//     const temp = celsiusToFahrenheit(0)
//     expect(temp).toBe(32)
// })

// // test('Async test demo', (done) => { //done has to be called after every async function (si me next ska rendsi emri)
// //     setTimeout(() => {
// //         expect(1).toBe(2)
// //         done()
// //     }, 2000)
// // })

// test('Shoiuld add two numbers', (done) => {
//     add(2, 3).then((sum) => {
//         expect(sum).toBe(5)
//         done()
//     })
// })

// // Per funksionet async/await keshillohet si meposhte mqs behet me smooth 
// test('Should add two numbers', async () => {
//     const sum = await add(2, 4)
//     expect(sum).toBe(6)
// })