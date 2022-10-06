import mongoose from "mongoose";

const tickersSchema = new mongoose.Schema({
  sno: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  last: {
    type: Number,
    required: true,
  },
  buy: {
    type: Number,
    required: true,
  },
  sell: {
    type: Number,
    required: true,
  },
  volume: {
    type: Number,
    required: true,
  },
  base_unit: {
    type: String,
    required: true,
  },
});

// module.exports = mongoose.model("ticker", tickersSchema);
export default mongoose.model("ticker", tickersSchema);
