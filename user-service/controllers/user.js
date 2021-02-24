const User = require("../../models/user")

module.exports.getUser = async (event, context, callback) => {
    return {
        user: "user succ",
        body: JSON.stringify(
            {
                id: event.pathParameters.id
            }
        ),
    }
}

module.exports.createUser = async (event, context, callback) => {
    await User.create({name:"asd"}).then(data=>{
        return {
            body:JSON.stringify(data)
        }
    })
    .catch(e=>{
        return {
            body:JSON.stringify(e)
        }
    })
}