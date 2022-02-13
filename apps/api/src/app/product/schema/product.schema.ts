import * as mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: '' },
    user: { type: Object, required: true },
    // user: { type: ObjectId, ref: config.tables.User, required: true, },
  },
  { timestamps: true }
);

ProductSchema.index(
  {
    title: 1,
    description: 1,
    user: 1,
  },
  {
    unique: false,
  }
);

export { ProductSchema };
