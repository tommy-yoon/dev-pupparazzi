const request = require('supertest')
const cheerio = require('cheerio')

const server = require('../server')

// const router = require('./routes')

test('Get /', (done) => {
  request(server)
    .get('/')
    .expect(200)
    .end((err, res) => {
      expect(err).toBeNull()
      expect(res.text).toMatch('Pupparazzi')
      done()
    })
})

test('Get /puppies/:id', (done) => {
  request(server)
    .get('/puppies/1')
    .expect(200)
    .end((err, res) => {
      expect(err).toBeNull()
      expect(res.text).toMatch('Pupparazzi')
      done()
    })
})

// testing using cheerio
// const $ = cheerio.load(res.text)
test('GET / using cheerio', (done) => {
  request(server)
    .get('/')
    .end((err, res) => {
      expect(err).toBeNull()
      const $ = cheerio.load(res.text)
      // console.log(res.text)
      // console.log($('a').data('puppy'))
      // console.log($('h1.title'))
      // expect($('a').data('puppy')).toHaveLength(10)
      // const artistText = $('a').text()
      // expect(artistText).toMatch('')
      expect($('h1.title').text()).toMatch('Pupparazzi')
      done()
    })
})
