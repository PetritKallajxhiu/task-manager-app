const mongoose = require('mongoose')
const validator = require('validator')

const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        require: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task

// Adding tasks
// const task1 = new Tasks({
//     description: "Clean the car",
//     completed: false
// })

// task1.save().then(() => {
//     console.log(task1)
// }).catch((error) => {
//     console.log(error)
// })