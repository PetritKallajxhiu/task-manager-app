const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('../models/task')

const userSchema = new mongoose.Schema({      //Define the object
    name: {   //Keto mund te bejme shume gjera si tipi, validation, etj
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        unique: true, //E ben unike pra mos te kene 2 accounts nje email
        required: true,
        trim: true, // trim space after or before
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email isn't valid")
            }
        }
    },

    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) {
            if (value.includes('password')) {
                throw new Error('Password can\'t contain : password!!')
            }
        }
    },

    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be positive!')
            }
        }
    },

    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar: {
        type: Buffer
    }
}, {
    timestamps: true
})

userSchema.virtual('tasks', {  // Ben referencimin e tasks ne user
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.methods.generateAuthToken = async function () { //Eshte keshtu pasi perdoret per Objektin dhe jo klasen
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET)

    user.tokens = user.tokens.concat({ token })

    await user.save()
    //Me dy rreshtat lart ne gjenerojme token dhe i ruajme ato ne db
    return token
}

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar

    return userObject
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email }) //Si findById por qe fusim cfaredo fushe te duam(variabli)
    if (!user) {
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}

// Hash the plain text passord before saving
userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next() //Nese nuk thirret ajo do vazhdoj pafundesisht qe te therrase 
})

// Delete User tasks when user is deleted
userSchema.pre('remove', async function (next) {
    const user = this
    await Task.deleteMany({ owner: user._id })
    next() //Qe te vazhdojn funksionet e tjera
})
const User = mongoose.model('User', userSchema) //Na lejon te kemi avant e midlleware funct

module.exports = User

//Adding users
// const me = new User({
//     name: '    Petrit',
//     email: '   petritKaLLAJXHIU@Gmail.com  ',
//     password: '    Passw12345    ',
//     age: 22
// })
// me.save().then(() => {
//     console.log(me)
// }).catch((error) => {
//     console.log(error)
// })
