const env = require('./test-environment')
const db = require('../../../server/db/population')

let testDb = null

beforeEach(() => {
  testDb = env.getTestDb()
  return env.initialise(testDb)
})
afterEach(() => env.cleanup(testDb))

describe('population database', () => {


  describe('checkExists', () => {

    it('returns true for existing country', () => {
      const country = 'New Zealand'

      return db.checkExists(country, testDb)
        .then(exists => {
          expect(exists).toBeTruthy()
        })
    })
  })
})
