import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    date: { type: Date, required: true },
    type: {
      type: String,
      required: true,
      enum: ["conferencia", "concierto", "taller"],
    },
    description: { type: String },
    valoracion: { type: Number, min: 1, max: 5 }, // Nuevo campo de valoración
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);

export default Event;
