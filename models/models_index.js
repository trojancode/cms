const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const basename = path.basename(__filename);
let db = {};
// process.env.DATABASE_NAME = "testing";
mongoose.set("useCreateIndex", true);
console.log("connecting to database..", process.env.DATABASE_NAME);
let limit = 0;

const setupConnection = async () => {
  try {
    limit++;
    await mongoose.connect(
      `mongodb+srv://${process.env.DATABASE_USERNAME}:${
        process.env.DATABASE_PASSWORD
      }@${process.env.DATABASE_HOSTNAME}/${
        process.env.DATABASE_NAME ? process.env.DATABASE_NAME : "dev"
      }?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        useCreateIndex: true,
      }
    );
  } catch (error) {
    console.log(error);
    if (limit < 5) {
      setupConnection();
    } else {
      throw error;
    }
  }
};
setupConnection();

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    var [name, model] = require(path.join(__dirname, file));
    db[name] = model;
  });

db.mongoose = mongoose;
module.exports = db;
