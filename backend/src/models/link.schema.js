import mongoose from 'mongoose';

const linkSchema = new mongoose.Schema({
    workspaceId:{
        type: String,
        required: true,
    },
    institutionName:{
        type: String,
        required: true,
    },
    username :{
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    }
},{
    timestamps: true,
});

export default mongoose.model('Link', linkSchema);