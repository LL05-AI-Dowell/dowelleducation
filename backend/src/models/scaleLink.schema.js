import mongoose from "mongoose";

const scaleLinkSchema = new mongoose.Schema({
    workspaceId: {
        type: String,
        required: true,
    },
    channelCount: {
        type: Number,
        required: true,
    },
    scaleId:{
        type: String,
        required: true,
    },
    scaleName: {
        type: String,
        required: true,
    },
    scaleType:{
        type: String,
        required: true,
    },
    links: [{
        link: {
            type: String,
            required: true,
        },
        isActive: {
            type: Boolean,
            default: false,
        }
    }]
},{
    timestamps: true
});

export default mongoose.model("Scalelink", scaleLinkSchema);