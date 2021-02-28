const { StitchClientFactory, BSON } = require('mongodb-stitch-server-sdk')
const { ObjectId } = BSON
const appId = "application-0-jbxvr"
const database = "mongodb+srv://kaimly:kaimly@cluster0.yo1gz.mongodb.net/test?retryWrites=true&w=majority"
const connection = {}

module.exports = async () => {
  if (connection.isConnected) {
    console.log('[MongoDB Stitch] Using existing connection to Stitch')
    return connection
  }

  try {
    const client = await StitchClientFactory.create(appId)
    const db = client.service('mongodb', 'mongodb-atlas').db(database)
    await client.login()
    const ownerId = client.authedId()
    console.log('[MongoDB Stitch] Created connection to Stitch')

    connection.isConnected = true
    connection.db = db
    connection.ownerId = ownerId
    connection.ObjectId = ObjectId
    return connection
  } catch (err) {
    console.error(err)
  }
}