const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
  message : {type: String, required: true},
  datetime: {type: String, required: true},
  by: {type: String, required: true},
  to: {type: String, required: true},
  id: {type: String}
});

module.exports = mongoose.model("Message", messageSchema);
