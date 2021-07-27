const sgMail = require('@sendgrid/mail')

// sgMail.setApiKey(process.env.SENDGRID_API_KEY)

// Duhet per verifikimin e pare
// sgMail.send({ //Ketu specifikohen inf si dergues, permbajtja, marres, etj
//     to: 'petritkallajxhiu@gmail.com',
//     from: 'petritkallajxhiu@gmail.com',
//     subject: 'This is my first creation',
//     text: 'I hope this one actually get to you'
// })

// const sendWelcomeEmail = (email, name) => {
//     sgMail.send({
//         to: email,
//         from: 'petritKallajxhiu@gmail.com',
//         subject: 'Thanks for joining us',
//         text: `Welcome to the app, ${name}. Let me know how you get along with the app`,
//         // html: -> Per te krijuar nje email me foto, etj me shume features
//     })
// }

// const sendCancellationEmail = (email, name) => {
// sgMail.send({
//     to: email,
//     from: 'petritkallajxhiu@gmail.com',
//     subject: 'Leaving us...',
//     text: 'Hello ${name}, we are very sad that u are leaving us! If u have time let a feedback why u doing it.'
// })
// }

// module.exports = {
//     sendWelcomeEmail,
//     sendCancellationEmail
// }