import mongoose, { Schema } from "mongoose";

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI);
mongoose.Promise = global.Promise;

// Define the schema
const ticketSchema = new Schema(
  {
    title: String,
    description: String,
    active: Boolean
  },
  {
    timestamps: true,  // Correct property name for timestamps
  }
);

// Define the model
const Ticket = mongoose.models.Ticket || mongoose.model("Ticket", ticketSchema);

export default Ticket;
