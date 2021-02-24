module.exports.auth = () => {
    return ({
        before: (handler, next) => {
            handler.event.fayez="evolvingkd"
             next();
        }
    })
}

module.exports.jwt = () => {
    return ({
        before: (handler, next) => {
            console.log(handler);
            handler.user = "user data"
            next();
        }
    })
};