const { Settings } = require('./settings')

test('throw TypeError', () => {
  expect(() => {
    // eslint-disable-next-line no-new
    new Settings({ whiteList: 'string' })
  }).toThrowError(TypeError)
})
