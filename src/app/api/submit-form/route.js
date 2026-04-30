import mongoose from "mongoose";
import { NextResponse } from "next/server";

// 1. Define the Schema with plan and amount included
const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  plan: { type: String, default: "Premium Trial" }, // 👈 Added
  amount: { type: Number, default: 799 }, // 👈 Added
  speciality: { type: String, required: true }, // 👈 Added
  status: { type: String, default: "Pending Payment" },
  paymentId: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
});

// Prevent Mongoose from recompiling the model
const Lead = mongoose.models.Lead || mongoose.model("Lead", leadSchema);

// 2. Database Connection Function
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

    // 👉 THE FIX: We must extract `plan` and `amount` from the incoming request body
    const { name, email, phone, plan, amount, speciality } = body;

    if (!name || !email || !phone || !speciality) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // 👉 THE FIX: Tell Mongoose to save the plan and amount in the database
    const newLead = await Lead.create({
      name,
      email,
      phone,
      plan: plan || "Premium Trial",
      amount: amount || 799,
      speciality: speciality || "",
    });

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
