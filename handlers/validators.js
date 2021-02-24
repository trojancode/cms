exports.userSignupValidator = (req, res, next) => {
    req.check('name', 'Name is required').notEmpty()
    req.check('email', 'Email must be between 3 to 32 characters')
        .matches(/.+\@.+\..+/)
        .withMessage("Email must contain @")
        .isLength({
            min: 4,
            max: 32
        });
    req.check('dob', 'DOB number is not valid')
        .matches(/((((19|20)([2468][048]|[13579][26]|0[48])|2000)-02-29|((19|20)[0-9]{2}-(0[4678]|1[02])-(0[1-9]|[12][0-9]|30)|(19|20)[0-9]{2}-(0[1359]|11)-(0[1-9]|[12][0-9]|3[01])|(19|20)[0-9]{2}-02-(0[1-9]|1[0-9]|2[0-8])))\s([01][0-9]|2[0-3]):([012345][0-9]):([012345][0-9]))/)
        .withMessage("DOB is not a valid timestamp");
    req.check('password', 'Password is required').notEmpty()
    req.check('password')
        .isLength({ min: 8 })
        .withMessage('Password must contain 8 character')
        .matches(/\d/)
        .withMessage("password must contain a number")
    const errors = req.validationErrors();
    if (errors) {
        return res.status(400).json({
            error: errors
        });
    }

    next();

}


exports.userSignInValidator = (req, res, next) => {

    const errors = req.validationErrors();
    if (errors) {
        return res.status(400).json({
            error: errors
        });
    }
    next();
}
