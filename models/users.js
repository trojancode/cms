var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const crypto = require('crypto');
const uuidv1 = require('uuidv1');

const userSchema = new Schema({
  name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32
  },
  email: {
      type: String,
      trim: true,
      required: true,
      unique: 100
  },
  phone: {
      type: String,
      trim: true,
      required: true,
      unique: 13
  },
  hashed_password: {
      type: String,
      required: true,
  },
  salt: String,
  role: {
      type: Number,
      default: 0
  },
}, {
  timestamps: true
});

userSchema.virtual('password')
  
  .set(function (password) {
      this._password = password,
      this.salt = uuidv1(),
      this.hashed_password = this.encryptPassword(password)
  })
  .get(function () {
      return this.password
  })

userSchema.methods = {

  authenticate: function(password){
      return this.encryptPassword(password) === this.hashed_password;
  },


  encryptPassword: function (password) {
      if (!password) return '';
      try {
          return crypto.createHmac('sha1', this.salt)
              .update(password)
              .digest('hex')
      }catch(err){
          return "";
      }
  }
};

module.exports = [
  "users",
  mongoose.model("users", userSchema),
];
