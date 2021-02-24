'use strict';

const {  createUser, getUser } = require("./controllers/user");
const middy = require('middy')
const { auth } = require("../middleware/auth");

module.exports.createUser = middy(createUser).use(auth());
module.exports.getUser = middy(getUser).use(auth());