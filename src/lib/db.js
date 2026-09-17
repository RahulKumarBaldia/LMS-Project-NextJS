import mongoose from "mongoose";
import { getMongoUri, isProduction } from "@/lib/env";

const connectToDb = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  await mongoose.connect(getMongoUri());

  if (!isProduction()) {
    console.log("MongoDB connected");
  }
};

export default connectToDb;
