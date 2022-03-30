import { Schema, model } from 'mongoose';

const OrderSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    item: {
      type: String,
      required: true,
    },
    observation: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export default model('Order', OrderSchema);
