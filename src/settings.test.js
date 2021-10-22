const { Settings } = require('./settings')

test('throw TypeError', () => {
  expect(() => {
    // @ts-ignore
    // eslint-disable-next-line no-new
    new Settings({ whiteList: 'string' })
  }).toThrowError(TypeError)
})
