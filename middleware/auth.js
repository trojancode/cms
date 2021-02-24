module.exports.auth = () => {
    return ({
        before: (handler, next) => {
             next();
        }
    })
}