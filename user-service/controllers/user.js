const User = require("../../models/user")

module.exports.getUser = async (event, context, callback) => {
    return {
        user: "user succ",
        body: JSON.stringify(
            {
                event,
                context,
                callback,
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

module.exports.loginUser = async (event) => {
    const responce = {data: 'userData is login'};

    return {body : JSON.stringify(event)};
}