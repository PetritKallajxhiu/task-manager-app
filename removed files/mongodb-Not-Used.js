// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID

const { MongoClient, ObjectId } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

// const id = new ObjectId()
// console.log(id.id.length)
// console.log(id.getTimestamp())

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log("Unable to connect to database!")
    }
    const db = client.db(databaseName)

    // => Insert one in dB
    // db.collection('users').insertOne({
    //     // _id: id,
    //     name: 'Ben',
    //     age: 26
    // }, (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert user!')
    //     }
    //     console.log(result.ops)
    // })

    // => Insert many in dB
    // db.collection('users').insertMany([
    //     {
    //         name: 'Jane',
    //         age: 28
    //     }, {
    //         name: 'John',
    //         age: 24
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert document')
    //     }
    //     console.log(result)
    // })

    // => Read from database
    // db.collection('users').findOne({ _id: new ObjectId("60fc2baacb0db1bb8912fc14") }, (error, user) => {
    //     if (error) {
    //         return console.log('Unable to fetch!')
    //     }
    //     console.log(user)
    // })

    // db.collection('users').find({ age: 23 }).toArray((error, users) => {
    //     console.log(users)
    // })

    // db.collection('users').find({ age: 23 }).count((error, count) => {
    //     console.log(count)
    // })

    // => Read task by findOne & id
    // db.collection('tasks').findOne({ _id: new ObjectId("60fc260798d98448cffc0b1f") }, (error, task) => {
    //     if (error) {
    //         return console.log("Unable to fetch data!")
    //     }
    //     console.log(task)
    // })

    // => Read tasks by find
    // db.collection('tasks').find({ completed: true }).toArray((error, tasks) => {
    //     if (error) {
    //         console.log("Unable to fetch data!")
    //     }
    //     console.log(tasks)
    // })

    // => Updating user (UpdateOne)
    // db.collection('users').updateOne(
    //     {
    //         _id: new ObjectId("60fc3f990bc30504e1dbb76a")
    //     }, {
    //     // $set: {    //Per rte ndryshuar vleren e nje fushe
    //     $inc: {       //Per te rritur(zbritur) vleren e nje fushe. Keto i gjen te mongodb update documentation
    //         age: 1
    //     }
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    // => Updating some fields (updateMany)
    // db.collection('tasks').updateMany(
    //     {
    //         completed: false
    //     }, {
    //         $set: {
    //             completed: true
    //         }
    //     }).then((result) => {
    //         console.log(result.modifiedCount)
    //     }).catch((error) => {
    //         console.log(error)
    //     })

    //  => DeleteMany
    // db.collection('users').deleteMany({
    //     age: 23
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    // => DeleteOne
    // db.collection('tasks').deleteOne({
    //     description: "Java"
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })
})


