import mongoose from "mongoose";

const homepageSchema = new mongoose.Schema(
    {
        homeImage: { type: String, default: "",},
        aboutImage: { type: String, default: "",},
    },
    { timestamps: true })

const homepageModel =
    mongoose.models.Homepage || mongoose.model("Homepage", homepageSchema);

export default homepageModel;