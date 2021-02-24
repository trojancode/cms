module.exports.auth = () => {
    return ({
        before: (handler, next) => {
            handler.event.fayez="evolvingkd"
             next();
        }
    })
}