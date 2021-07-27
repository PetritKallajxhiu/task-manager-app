const express = require('express')
const User = require('../models/user')
const router = new express.Router()
const auth = require('../middleware/auth')
const multer = require('multer')
// const { sendWelcomeEmail, sendCancellationEmail } = require('../emails/account')
const sharp = require('sharp')

// The commented code is ith the old version withour async/wait
router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        // sendWelcomeEmail(user.email, user.name)
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }

    //     user.save().then(() => {
    //         res.status(201).send(user)
    //     }).catch((e) => {
    //         res.status(400).send(e)
    //     })
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken() //Metoda gjenerohet te user dhe jo User pasi e duam x nje individ
        res.send({ user, token })
    } catch (e) {
        res.status(400).send()
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

// Upload function
const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|PNG)$/)) {
            return cb(new Error('Please upload a image'))
        }
        cb(undefined, true)
    }
})

// Upload avatar
router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

// Delete avatar
router.delete('/users/me/avatar', auth, async (req, res) => {
    req.user.avatar = undefined
    await req.user.save()
    res.send()
})

// Get avatar
router.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if (!user) {
            throw new Error()
        }
        res.set('Content-Type', 'image/jpg')
        res.send(user.avatar)
    } catch (e) {
        res.status(404).send()
    }
})

router.get('/users/me', auth, async (req, res) => {

    res.send(req.user)

    // Keto jane metodat kur i merrnim te gjithe userat, pra jo me auth
    // try {
    //     const users = await User.find({})
    //     res.send(users)
    // } catch (e) {
    //     res.status(500).send(e)
    // }

    // User.find({}).then((users) => {
    //     res.send(users)
    // }).catch((e) => {
    //     res.status(500).send(e)
    // })
})

// Not needed anymore
// router.get('/users/:id', async (req, res) => {
//     try {
//         const user = await User.findById(req.params.id)
//         if (!user) {
//             return res.status(404).send()
//         }
//         res.send(user)
//     } catch (e) {
//         res.status(500).send(e)
//     }

//     // User.findById(req.params.id).then((user) => {
//     //     if (!user) {
//     //         return res.status(404).send()
//     //     }
//     //     res.send(user)
//     // }).catch((e) => {
//     //     res.status(500).send(e)
//     // })
// })


// Update user Api
router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age'] // tregon kush lejohen te behen update
    const isValidOperation = updates.every((update) => { //every e kontrollon per cdo item ne array
        return allowedUpdates.includes(update)
    })

    if (!isValidOperation) {
        return res.status(400).send('error: Invalid parameters update')
    }
    try {
        updates.forEach((update) => req.user[update] = req.body[update])

        await req.user.save()

        res.send(req.user)

    } catch (e) {
        res.status(400).send(e)
    }
})


// Delete User API
router.delete('/users/me', auth, async (req, res) => {
    try {
        // const user = await User.findByIdAndDelete(req.params.user._id)
        // if (!user) {
        //     return res.status(404).send()
        // }
        // Kodi mesiperm optimizohet ne:

        await req.user.remove()
        // sendCancellationEmail(req.user.email, req.user.name)
        res.send(req.user)

    } catch (e) {
        res.status(401).send(e)
    }
})


module.exports = router