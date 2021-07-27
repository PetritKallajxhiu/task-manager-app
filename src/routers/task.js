const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = express.Router()

// Tasks API
router.post('/tasks', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    try {
        await task.save()
        res.status(201).send(task)

    } catch (e) {
        res.status(400).send(e)
    }
})

// GET /tasks?completed=false (ose true ... pra te shfaqi ato qe do ti ne vaaresi te zgjedhjes)
router.get('/tasks', auth, async (req, res) => {
    const match = {}
    const sort = {}

    if (req.query.completed) {
        match.completed = req.query.completed === 'true'
    }

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }

    try {
        // const tasks = await Task.find({ owner: req.user._id })
        // res.send(tasks)

        // ose
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit), //Funksion i mongoose qe konverton tekstin ne number
                skip: parseInt(req.query.skip),
                sort
                // sort: {
                //     // createdAt: 1 //-1-> nga me i riu te vjetri ; +1 -> nga me i vjetri -> riu
                //     // completed: -1
                // }
            }
        }).execPopulate()
        res.send(req.user.tasks)
    } catch (e) {
        res.status(500).send(e)
    }

    // Task.find({}).then((tasks) => {
    //     res.status(200).send(tasks)
    // }).catch((e) => {
    //     res.status(500).send(e)
    // })
})


router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findOne({ _id, owner: req.user._id })
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }

    // Task.findById(req.params.id).then((task) => {
    //     if (!task) {
    //         res.status(404).send()
    //     }
    //     res.status(200).send(task)
    // }).catch((e) => {
    //     res.status(500).send(e)
    // })
})


// Update task Api
router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    if (!isValidOperation) {
        return res.status(404).send('Error: Invalid update parameter!')
    }


    try {
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })
        if (!task) {
            return res.status(404).send()
        }
        updates.forEach((update) => task[update] = req.body[update])

        await task.save()

        // const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!task) {
            return res.status(404).send()
        }
        console.log(task)
        res.send(task)
    } catch (e) {
        return res.status(400).send(e)
    }
})


// Delete task API
router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })
        if (!task) {
            return res.status(404).send()
        }
        await task.delete()
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router