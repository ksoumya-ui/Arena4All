
var mongoose = require("mongoose");
var Schema = mongoose.Schema;


const feed = {
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    default: 0,
  },
  likesCount : {
    type: Number,
    default: 0,
  },
  downloadCount :{
    type:Number,
    default:0
  },
  viewCount :{
    type:Number,
    default:0
  },
  image :{
    type : String,
    default :''
  },
  category :{
    type: String,
    default :''
  }
};

var feedSchema = new Schema(feed,{ timestamps: true });
var Feed = mongoose.model("feed", feedSchema);

module.exports = Feed;