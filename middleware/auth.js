module.exports.auth = () => {
    return ({
        before: ({event}, next) => {
            event.fayez="evolvingkd"
             next();
        }
    })
}