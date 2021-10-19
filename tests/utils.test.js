const utils = require('../utils')

test('test getPuppies - not null', (done) => {
  const puppies = utils.getPuppies((err, obj) => {
    expect(err).toBeNull()
    expect(obj).not.toBeNull()
    done()
  })
})

test('test getPuppies - type', (done) => {
  const puppies = utils.getPuppies((err, obj) => {
    expect(err).toBeNull()
    expect(obj).not.toBeNull()
    expect(obj).toBeInstanceOf(Object)
    expect(obj).toHaveProperty('puppies')
    done()
  })
})

test('test getPuppies - have property', (done) => {
  const puppies = utils.getPuppies((err, obj) => {
    expect(err).toBeNull()
    expect(obj).not.toBeNull()
    expect(obj).toHaveProperty('puppies')
    done()
  })
})

test('test getPuppies - subset', (done) => {
  const puppies = utils.getPuppies((err, obj) => {
    expect(err).toBeNull()
    expect(obj).not.toBeNull()
    expect(obj.puppies[0]).toMatchObject({id:1})
    done()
  })
})