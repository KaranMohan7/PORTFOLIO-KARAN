import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
    {
    shortName: { type: String, required: true },
    shortImage: { type: String, default: ""},
    name: { type: String, required: true },
    description: { type: String, required: true },
    mainImage: { type: String, default: "", required: true },
    techStack: [{ type: String }],
    type: {
        typeName: { type: String, required: true },
        typeCategory: { type: String, required: true },
        typeDuration: { type: String, required: true },
    },
    detailDescription: [{ type: String }],
    images: [{ type: String, default: "" }],
    featured: { type: Boolean, default: false },
    link: {type: String, required: true},
}, 
{ timestamps: true })

const projectModel =
    mongoose.models.Project || mongoose.model("Project", projectSchema);

export default projectModel;