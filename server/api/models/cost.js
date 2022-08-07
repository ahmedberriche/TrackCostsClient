const mongoose = require("mongoose");

const costSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  CAC40: { type: Number },
  NASDAQ: { type: Number },
  dateTime: { type: Date },
});

module.exports = mongoose.model("Cost", costSchema);
