import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    addressId: {
      type: String,
      required: false,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    items: [
      {
        productId: {
          type: String,
          
        },
        Price: {
          type: Number,
          
          
        },
        purchasedQty: {
          type: Number,
          
        },
      },
    ],
    paymentStatus: {
      type: String,
      enum: ['pending', 'completed', 'cancelled', 'refund'],
      default: 'pending',
    },
    paymentType: {
      type: String,
      enum: ['cod', 'card'],
      required: false,
    },
    orderStatus: [
      {
        type: {
          type: String,
          enum: ['ordered', 'packed', 'shipped', 'delivered'],
          default: 'ordered',
        },
        date: {
          type: Date,
        },
        isCompleted: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model('Order', orderSchema);