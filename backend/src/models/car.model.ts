import mongoose, { Schema, Document } from "mongoose";

export interface ICar extends Document {
  user: mongoose.Types.ObjectId; // References the user who owns the car
  title: string;
  description: string;
  images: string[]; // Array of image URLs
  tags: {
    car_type: string;
    company: string;
    dealer: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const CarSchema = new Schema<ICar>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      validate: [arrayLimit, "{PATH} exceeds the limit of 10"],
    },
    tags: {
      car_type: { type: String, required: true },
      company: { type: String, required: true },
      dealer: { type: String, required: true },
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Validator for image array length
function arrayLimit(val: string[]) {
  return val.length <= 10;
}

const Car = mongoose.model<ICar>("Car", CarSchema);

export default Car;
