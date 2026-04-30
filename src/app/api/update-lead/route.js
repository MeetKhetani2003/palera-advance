import mongoose from "mongoose";
import { NextResponse } from "next/server";

// We include paymentId here so we can store the Razorpay transaction ID!
const leadSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  status: { type: String, default: "Pending Payment" },
  paymentId: String,
  createdAt: { type: Date, default: Date.now },
});

const Lead = mongoose.models.Lead || mongoose.model("Lead", leadSchema);

const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(process.env.MONGODB_URI);
};

export async function PUT(request) {
  try {
    await connectDB();
    const { id, status, paymentId } = await request.json();

    if (!id || !status) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    // Update the document in MongoDB
    const updatedLead = await Lead.findByIdAndUpdate(
      id,
      { status: status, paymentId: paymentId },
      { new: true },
    );

    return NextResponse.json(
      { message: "Status updated", lead: updatedLead },
      { status: 200 },
    );
  } catch (error) {
    console.error("Update API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
