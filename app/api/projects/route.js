import { uploadImage } from "@/helpers/uploadImage";
import connectCloudinary from "@/libs/cloudinary";
import { connectDB } from "@/libs/db";
import projectModel from "@/models/project";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await connectDB();
        connectCloudinary();

        const formData = await req.formData();
        const projectData = formData.get("projectData");
        const shortImage = formData.get("shortImage");
        const mainImage = formData.get("mainImage");
        const images = formData.getAll("images");

        if (!projectData) {
            return NextResponse.json( { success: false, message: "ProjectData not provided" },
  { status: 400 });
        }
        if (!mainImage || !shortImage) {
            return NextResponse.json( { success: false, message: "Images not found" },
  { status: 400 });
        }
        const parsedData = JSON.parse(projectData);
        

        // upload using stream
        const mainImageUpload = await uploadImage(mainImage);
        const shortImageUpload = await uploadImage(shortImage);
        const imagesUpload = await Promise.all(
            images.map((img) => uploadImage(img))
        );

        const createdProject = await projectModel.create({
            ...parsedData,
            shortImage: shortImageUpload.secure_url,
            mainImage: mainImageUpload.secure_url,
            images: imagesUpload.map((img) => img.secure_url),
        })

        if (!createdProject) {
            return NextResponse.json({ success: false, message: "Something went wrong while creating Project" }, { status: 401 })
        }

        return NextResponse.json( { success: true, message: "Project Created Successfully" }, { status: 200 })


    } catch (error) {
        return NextResponse.json( { success: false, message: error.message }, { status: 500 })
    }
}


export async function GET(req) {
    try {
        await connectDB();
        const allProjectsData = await projectModel.find();
        return NextResponse.json({ success: true, message: "All projects retrieved successfully", data: allProjectsData }, { status: 200 });
    } catch (error) {
        return NextResponse.json( { success: false, message: error.message }, { status: 500 })
    }
}

