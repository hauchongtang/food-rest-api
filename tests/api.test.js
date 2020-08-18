const mongoose = require('mongoose')
const app = require('../app')
const request = require('supertest')

// GET -> POST -> UPDATE -> DELETE

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
  });
});

describe('JSON functional test', () => {
  it('Test that api returns JSON type', async () => {
    await request(app)
      .get('/api/foodplaces')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
})

describe('GET request returns data', () => {
  it('Returns transactions', async () => {
    const res = await request(app).get('/api/foodplaces')
    const data = res.body.data
    expect(data.length).toBe(1)
  })

  it('Check if data has values', async () => {
    const res = await request(app).get('/api/foodplaces')
    const data = res.body.data
    const dateArr = data.map(f => f.beautifyDate)
    const nameArr = data.map(f => f.name)
    const genreArr = data.map(f => f.genre)
    const locationArr = data.map(f => f.location)
    const busArr = data.map(f => f.bus)
    const trainArr = data.map(f => f.train)
    const countryArr = data.map(f => f.country)
    const idArr = data.map(f => f._id)
    expect(dateArr).toHaveLength(1)
    expect(nameArr).toHaveLength(1)
    expect(genreArr).toHaveLength(1)
    expect(locationArr).toHaveLength(1)
    expect(busArr).toHaveLength(1)
    expect(trainArr).toHaveLength(1)
    expect(countryArr).toHaveLength(1)
    expect(idArr).toHaveLength(1)
  })
})

describe('POST new foodplace and see if there is new data object created', () => {
  it('Test POST request to mongoDB ability', async () => {
    const newPost = {
      name: 'Mala',
      genre: 'Chinese',
      location: 'Gek Poh Shopping Centre',
      country: 'Singapore',
      bus: '243, 181',
      train: 'nil'
    }
    await request(app)
      .post('/api/foodplaces')
      .send(newPost)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    // GET response from database to verify that newPost goes through
    const res = await request(app).get('/api/foodplaces')
    const data = res.body.data
    expect(data.length).toBe(2)
    // Random test for content
    const nameArr = data.map(f => f.name)
    const countryArr = data.map(f => f.country)
    expect(nameArr[1]).toBe('Mala')
    expect(countryArr[1]).toBe('Singapore')
  })

  it('Food places without (name||genre||location||country) is not added', async () => {
    const failedPost = { // Post only the name without the others
      name: 'randomFood'
    }
    await request(app)
      .post('/api/foodplaces')
      .send(failedPost)
      .expect(400)
  })
})

describe('Test for UPDATE request', () => {
  it('Update by id', async () => {
    // GET foodplaces._id
    const res = await request(app).get('/api/foodplaces')
    const data = res.body.data
    const idArray = data.map(f => f._id)
    const firstID = idArray[0]

    const updatePost = {
      name: 'Mala Soup',
      genre: 'Chinese',
      location: 'Gek Poh Shopping Centre',
      country: 'Singapore',
      bus: '243, 181',
      train: 'nil'
    }

    // UPDATE by id
    await request(app)
      .patch(`/api/foodplaces/${firstID}`)
      .send(updatePost)
      .expect(200)

    // GET by id to check if UPDATE is successful --> I changed name to mala soup, see updatePost
    const response = await request(app).get(`/api/foodplaces/${firstID}`)
    expect(data[0].name).toBe('Mala Soup')
  })
})

describe('Test for DELETE request', () => {
  it('Able to delete by id', async () => {
    //GET foodplaces._id
    const res = await request(app).get('/api/foodplaces')
    const data = res.body.data
    const idArray = data.map(f => f._id)
    const firstID = idArray[0]

    // DELETE by id
    await request(app)
      .delete(`/api/foodplaces/${firstID}`)
      .expect(200)
    // GET by id to check if DELETE is successful
    await request(app)
      .get(`/api/foodplaces${firstID}`)
      .expect(404)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})