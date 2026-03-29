import { uploadImage } from "@/helpers/uploadImage";
import connectCloudinary from "@/libs/cloudinary";
import { connectDB } from "@/libs/db";
import projectModel from "@/models/project";
import { NextResponse } from "next/server";



export async function POST(req, { params }) {
    try {
        await connectDB();
        connectCloudinary();
        const projectId = params.id;
        const formData = await req.formData();
        const projectData = formData.get("projectData");
        const shortImage = formData.get("shortImage");
        const mainImage = formData.get("mainImage");
        const images = formData.getAll("images");

        if (!projectData) {
            return NextResponse.json({ status: 404 }, { success: false, message: "ProjectData not provided" });
        }
        const parsedData = JSON.parse(projectData);
        let updatedFields = { ...parsedData };
        if (mainImage) {
            const upload = await uploadImage(mainImage);
            updatedFields.mainImage = upload.secure_url;
        }

        if (shortImage) {
            const upload = await uploadImage(shortImage);
            updatedFields.shortImage = upload.secure_url;
        }

        if (images.length > 0) {
            const uploads = await Promise.all(
                images.map((img) => uploadImage(img))
            );
            updatedFields.images = uploads.map((img) => img.secure_url);
        }

        const updatedData = await projectModel.findByIdAndUpdate(
            projectId,
            updatedFields,
            { new: true }
        );
        if (!updatedData) {
            return NextResponse.json({ status: 401 }, { success: false, message: "Something went wrong while updating Project" })
        }

        return NextResponse.json({ status: 200 }, { success: true, message: "Project Updated Successfully" });

    } catch (error) {
        return NextResponse.json({ status: 500 }, { success: false, message: error.message })
    }
}

export async function GET(req, { params }) {
    try {
        await connectDB();
        const projectId = params.id;
        const getSingleData = await projectModel.findById(projectId);
        if (!getSingleData) {
            return NextResponse.json({ status: 404 }, { success: false, message: "Data not found" });
        }
        return NextResponse.json({ status: 200 }, { success: true, message: "Retrieved Single Project Successfully", data: getSingleData });
    } catch (error) {
        return NextResponse.json({ status: 500 }, { success: false, message: error.message })
    }
}


export async function DELETE(req, {params}){
    try {
         await connectDB();
        const projectId = params.id;
        const deleteData = await projectModel.findByIdAndDelete(projectId);
        if(!deleteData){
            return NextResponse.json({status: 401}, { success: false, message: "Can't be deleted" })
        }
        return NextResponse.json({status: 200}, {success: true, message: "Project Deleted Successfully"})
    } catch (error) {
            return NextResponse.json({ status: 500 }, { success: false, message: error.message })
    }
}