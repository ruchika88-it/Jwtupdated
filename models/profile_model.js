const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const address_schema= new Schema({
    line1: { type: String },
    city: { type: String} ,
    state: { type: String },
    zipcode: { type: String }
});

const profile_schema = new Schema({
  id:{type:Schema.Types.ObjectId},
  address:[address_schema],
  phoneno: { type: Number },
  fathername:{type:String },
  heighestqual:{type: String}
});

let Profile = mongoose.model("profile", profile_schema);

module.exports = Profile;
