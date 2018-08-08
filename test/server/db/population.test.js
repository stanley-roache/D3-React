const env = require('./test-environment')
const db = require('../../../server/db/population')

describe('population database', () => {
  let testDb = null
  beforeEach(() => {
    testDb = env.getTestDb()
    return env.initialise(testDb)
  })
  afterEach(() => env.cleanup(testDb))

  describe('checkExists', () => {
    it('returns true for existing country', () => {
      const country = 'New Zealand'

      return db.checkExists(country)
        .then(exists => {
          expect(exists).toBeTruthy()
        })
    })
  })
})
