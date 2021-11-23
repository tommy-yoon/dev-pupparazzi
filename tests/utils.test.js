const utils = require('../utils')

test('getPuppies - not null', (done) => {
  utils.getPuppies((err, obj) => {
    expect(err).toBeNull()
    expect(obj).not.toBeNull()
    done()
  })
})

test('getPuppies - type', (done) => {
  utils.getPuppies((err, obj) => {
    expect(err).toBeNull()
    expect(obj).not.toBeNull()
    expect(obj).toBeInstanceOf(Object)
    done()
  })
})

test('getPuppies - have property', (done) => {
  utils.getPuppies((err, obj) => {
    expect(err).toBeNull()
    expect(obj).not.toBeNull()
    expect(obj).toHaveProperty('puppies')
    done()
  })
})

test('getPuppies - subset', (done) => {
  utils.getPuppies((err, obj) => {
    expect(err).toBeNull()
    expect(obj).not.toBeNull()
    expect(obj.puppies[0]).toMatchObject({ id: 1 })
    done()
  })
})

test('getPuppy - not null', (done) => {
  const id = 1
  utils.getPuppy(id, (err, obj) => {
    expect(err).toBeNull()
    expect(obj).not.toBeNull()
    done()
  })
})

test('getPuppy - type', (done) => {
  const id = 1
  utils.getPuppy(id, (err, obj) => {
    expect(err).toBeNull()
    expect(obj).not.toBeNull()
    expect(obj).toBeInstanceOf(Object)
    done()
  })
})

test('getPuppy - have property', (done) => {
  const id = 1
  utils.getPuppy(id, (err, obj) => {
    expect(err).toBeNull()
    expect(obj).not.toBeNull()
    expect(obj).toHaveProperty('name')
    expect(obj).toHaveProperty('owner')
    expect(obj).toHaveProperty('image')
    expect(obj).toHaveProperty('breed')
    done()
  })
})

test('getPuppy - subset', (done) => {
  const id = 1
  utils.getPuppy(id, (err, obj) => {
    expect(err).toBeNull()
    expect(obj).not.toBeNull()
    expect(obj).toMatchObject({ name: 'Fido' })
    done()
  })
})
