
const connectToDatabase = require("../../models/index")

module.exports.getUser = async (event, context, callback) => {
    return {
        user: "user succ",
        body: JSON.stringify(
            {
                id: event.pathParameters.id,
                fayz: event.fayez,
                event
            }
        ),
    }
}

module.exports.createUser = async(event, context, callback) => {
    try {
        const { db } = await connectToDatabase()
        const { insertedId } = await db.collection('users')
            .insertOne(JSON.parse(event.body))

        const addedObject = await db.collection('users')
            .findOne({ _id: insertedId })

        return {
            statusCode: 200,
            body: JSON.stringify(addedObject)
        }
    } catch (err) {
        return {
            statusCode: err.statusCode || 500,
            headers: { 'Content-Type': 'text/plain' },
            body: 'Could not create the object.'
        }
    }
}