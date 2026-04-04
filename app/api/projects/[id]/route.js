import { uploadImage } from "@/helpers/uploadImage";
import connectCloudinary from "@/libs/cloudinary";
import { connectDB } from "@/libs/db";
import projectModel from "@/models/project";
import { NextResponse } from "next/server";



export async function POST(req, { params }) {
    try {
        await connectDB();
        connectCloudinary();
               const { id } = await params;
                       if (!id) {
            return NextResponse.json({ success: false, message: "ID not found" }, { status: 404 });
        }
        const formData = await req.formData();
        const projectData = formData.get("projectData");
        const shortImage = formData.get("shortImage");
        const mainImage = formData.get("mainImage");
        const images = formData.getAll("images");

        if (!projectData) {
            return NextResponse.json({ success: false, message: "ProjectData not provided" },{ status: 404 });
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
            id,
            updatedFields,
            { new: true }
        );
        if (!updatedData) {
            return NextResponse.json({ success: false, message: "Something went wrong while updating Project" },{ status: 401 })
        }

        return NextResponse.json({ success: true, message: "Project Updated Successfully" }, { status: 200 });

    } catch (error) {
        return NextResponse.json( { success: false, message: error.message },{ status: 500 })
    }
}

export async function GET(req, { params }) {
    try {
        await connectDB();
        const { id } = await params;
        if (!id) {
            return NextResponse.json({ success: false, message: "ID not found" }, { status: 404 });
        }
        const getSingleData = await projectModel.findById(id);
        if (!getSingleData) {
            return NextResponse.json({ success: false, message: "Data not found" }, { status: 404 });
        }
        return NextResponse.json({ success: true, message: "Retrieved Single Project Successfully", data: getSingleData }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 })
    }
}


export async function DELETE(req, { params }) {
    try {
        await connectDB();
        const { id } = await params;
        if (!id) {
            return NextResponse.json({ success: false, message: "ID not found" }, { status: 404 });
        }
        const deleteData = await projectModel.findByIdAndDelete(id);
        if (!deleteData) {
            return NextResponse.json({ success: false, message: "Can't be deleted" }, { status: 401 })
        }
        return NextResponse.json({ success: true, message: "Project Deleted Successfully" }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 })
    }
}