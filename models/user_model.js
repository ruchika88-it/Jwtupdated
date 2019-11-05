const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user_schema = new Schema({
  firstname: { type: String, required: true,  },
  lastname: { type: String },
  password:{type:String,required: true },
  emailid: { type: String, required: true }
});

let User = mongoose.model("User", user_schema);

module.exports = User;
