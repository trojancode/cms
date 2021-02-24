'use strict';

const {  createUser , loginUser} = require("./controllers/user");
const middy = require('middy')
const { auth, jwt } = require("../middleware/auth");

module.exports.createUser = middy(createUser).use(auth());

module.exports.loginUser = middy(loginUser).use(jwt());