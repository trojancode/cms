module.exports.auth = () => {
    return ({
        before: (handler, next) => {
            handler.fed = "ABC"
             next();
        }
    })
}