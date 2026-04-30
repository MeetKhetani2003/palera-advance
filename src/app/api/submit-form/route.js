import mongoose from "mongoose";
import { NextResponse } from "next/server";

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  status: { type: String, default: "Pending Payment" },
  paymentId: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
});

const Lead = mongoose.models.Lead || mongoose.model("Lead", leadSchema);

const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
  }
};

// 3. Handle the POST Request
export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();

    const { name, email, phone } = body;

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Save to database (paymentId will default to null initially)
    const newLead = await Lead.create({ name, email, phone });

    return NextResponse.json(
      { message: "Lead saved successfully", lead: newLead },
      { status: 200 },
    );
  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
