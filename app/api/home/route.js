import { NextResponse } from "next/server";
import { connectDB } from "@/libs/db";
import homepageModel from "@/models/homepage";
import { uploadImage } from "@/helpers/uploadImage";
import connectCloudinary from "@/libs/cloudinary";


export async function GET() {
  try {
    await connectDB();

    const data = await homepageModel.findOne();

    return NextResponse.json({
      success: true,
      message: "Successfully retrieved Data",
      data,
    },{status: 200});

  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
    },{status: 500});
  }
}

export async function POST(req) {
  try {
    await connectDB();
    connectCloudinary();

    const formData = await req.formData();

    const homeImage = formData.get("homeImage");
    const aboutImage = formData.get("aboutImage");

    let existing = await homepageModel.findOne();

    let updatedFields = {};

    // ✅ HOME IMAGE
    if (homeImage) {
      const upload = await uploadImage(homeImage);
      updatedFields.homeImage = upload.secure_url;
    } else if (existing?.homeImage) {
      updatedFields.homeImage = existing.homeImage;
    }

    // ✅ ABOUT IMAGE
    if (aboutImage) {
      const upload = await uploadImage(aboutImage);
      updatedFields.aboutImage = upload.secure_url;
    } else if (existing?.aboutImage) {
      updatedFields.aboutImage = existing.aboutImage;
    }

    // ✅ UPDATE
    if (existing) {
      const updated = await homepageModel.findByIdAndUpdate(
        existing._id,
        updatedFields,
        { new: true }
      );

      return NextResponse.json({
        success: true,
        message: "Homepage/About updated successfully",
        data: updated,
      });
    }

    // ✅ CREATE (first time)
    const created = await homepageModel.create(updatedFields);

    return NextResponse.json({
      success: true,
      message: "Homepage/About created successfully",
      data: created,
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}