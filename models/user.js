const Sequelize = require('sequelize');
const db = require('./index');
const crypto = require('crypto');
var uuidv1 = require('uuidv1');
const { encryptPassword } = require('../handlers/passwordEncrypt');
const User = db.define('usr', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        isAlpha: true,
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        isEmail: true,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    dob: {
        type: Sequelize.DATE,
        allowNull: false
    },
    salt: {
        type: Sequelize.STRING,
    },
    role: {
        type: Sequelize.INTEGER,
        defaultValue: 1
    },
    status: {
        type: Sequelize.ENUM('active', 'banned', 'deleted', 'notverified','disabled'),
        defaultValue: 'notverified'
    },
    referalcode: {
        type: Sequelize.STRING,
        allowNull: true
    },
    isReferEnabled: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue:false,
    },
    referCount: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue:0,
    },
    referCountLimit: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue:10,
    },

});

User.beforeCreate(function (user, options) {
    user.salt = uuidv1();
    let _hashPassword = encryptPassword(user.salt, user.password);
    user.password = _hashPassword;
});


User.sync().then(() => {
    console.log('Users table created');
});
module.exports = User;
