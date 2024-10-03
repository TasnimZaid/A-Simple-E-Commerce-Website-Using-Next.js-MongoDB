import mongoose from "mongoose";
console.log(1)
const { MONGODB_URI } = "mongodb+srv://tasnimaboarqob:12345@cluster0.1k9jf.mongodb.net/nextjs1?retryWrites=true&w=majority&appName=Cluster0";

export const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return; // Already connected
  }

  try {
    await mongoose.connect("mongodb+srv://tasnimaboarqob:12345@cluster0.1k9jf.mongodb.net/nextjs1?retryWrites=true&w=majority&appName=Cluster0", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connected');
  } catch (error) {
    console.error('Database connection error:', error);
    throw new Error('Failed to connect to the database');
  }
};

