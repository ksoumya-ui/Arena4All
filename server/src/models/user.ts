var mongoose = require("mongoose");
var Schema = mongoose.Schema;


const user ={
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }

};

var UserSchema = new Schema( user,{ timestamps: true });

var User = mongoose.model("User", UserSchema);

module.exports = User;