const mongoose = require('mongoose');

const { Schema } = mongoose;

const chatSchema = new Schema({
  roomTitle: String,
  owner: String,
  msg: Array,
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
