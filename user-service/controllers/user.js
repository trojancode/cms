
const db = require("../../models/index")
const connectToDatabase = require("../../models/index")
const Users = require("../../models/users")

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

module.exports.createUser = async (event, context, callback) => {
    return await db.users.create(JSON.parse(event.body)).then(data=>{
        return {
            body: JSON.stringify(data)
        }
    }).catch(err=>{
        console.log(err);
        return {
            body: JSON.stringify({
                error:err
            })
        }
    })
}