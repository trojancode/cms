'use strict';

const {  createUser } = require("./controllers/user");
const middy = require('middy')
const { auth } = require("../middleware/auth");

module.exports.createUser = middy(createUser).use(auth());