const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const {userOneId, userOne, setupDatabase} = require('./fixtures/db')


beforeEach(setupDatabase)

test('Should sign up a new User', async () => {
    const response = await request(app).post('/users').send({   // Send() lejon qe nje objekti ti kalojme data
        name: 'Petrit',
        email: 'thisisaeemail@gmail.com',
        password: 'mywwPass2020'
    }).expect(201)

    // Assert that the DB was changed correcttly
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    // Assertions about the response
    // expect(response.body.user.name).toBe('Petrit')   -> Old method
    expect(response.body).toMatchObject({
        user: {
            name: 'Petrit',
            email: 'thisisaeemail@gmail.com'
        },
        token: user.tokens[0].token
    })
    expect(user.password).not.toBe('mywwPass2020')
})


test('Should log-in', async () => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)

    const user = await User.findById(userOneId)
    expect(response.body.token).toBe(user.tokens[1].token)
})

test('Shouldn\'t login nonexistent user', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: 'dfjeefefe'
    }).expect(400)
})

test('Should get profile for user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`) //Set perdoret vec x auth header
        .send()
        .expect(200)
})

test('Shouldn\'t get profile for unauthenticated user', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
})

test('Should update user field', async () => {
    await request(app)
        .patch('/users/me')
        .send({
            name: 'Mike'
        })
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`) //Set perdoret vec x auth header
        .expect(200)

        // To check DB if everything went well
    const user = await User.findById(userOneId)
    expect(user.name).toEqual('Mike')
})

test('Shouldm\'t update user field', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`) //Set perdoret vec x auth header
        .send({
            location: 'Mike'
        })
        .expect(400)
})

test('Should delete account for user', async () => {
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    const user = await User.findById(userOneId)
    expect(user).toBeNull()
})

test('Shouldn\'t delete user', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})

test('Should upload avatar image', async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/download.jpg')
        .expect(200)

    const user = await User.findById(userOneId)
    expect(user.avatar).toEqual(expect.any(Buffer)) //Nese do krahasohen obj nuk behet toBe sepse referon memoren, por toEqual
})