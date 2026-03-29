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
            return NextResponse.json({ status: 400 }, { success: false, message: "ProjectData not provided" });
        }
        if (!mainImage || shortImage) {
            return NextResponse.json({ status: 400 }, { success: false, message: "images not found" });
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
            return NextResponse.json({ status: 401 }, { success: false, message: "Something went wrong while creating Project" })
        }

        return NextResponse.json({ status: 200 }, { success: true, message: "Project Created Successfully" })


    } catch (error) {
        return NextResponse.json({ status: 500 }, { success: false, message: error.message })
    }
}


export async function GET(req) {
    try {
        await connectDB();
        const allProjectsData = await projectModel.find();
        return NextResponse.json({ status: 200 }, { success: true, message: "All projects retrieved successfully", data: allProjectsData });
    } catch (error) {
        return NextResponse.json({ status: 500 }, { success: false, message: error.message })
    }
}

