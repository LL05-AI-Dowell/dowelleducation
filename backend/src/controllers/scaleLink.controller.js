import { asyncHandler } from "../utils/asyncHandler.js";
import PayloadValidationServices from "../services/validationservices.js";
import { ScalelinkSchema } from "../utils/payloadSchema.js";
import ScaleLink from "../models/scaleLink.schema.js";
import { getScaleLinkForLearningLevelIndex } from "../services/api.services.js";
import { learningIndexScaleUrl } from "../utils/helper.js"


const saveScaleLink = asyncHandler(async (req, res)=>{
    const { workspaceId, username } = req.body;

    const validatePayload = PayloadValidationServices.validateData(ScalelinkSchema, {
        workspaceId: workspaceId,
        username: username
    });

    if (!validatePayload.isValid){
        return res.status(400).json({
            success: false,
            message: "Invalid payload",
            error: validatePayload.errors
        });
    }

    const getScaleLink = await getScaleLinkForLearningLevelIndex(workspaceId, username);

    if (!getScaleLink.data.success){
        return res.status(400).json({
            success: false,
            message: "Error fetching scale link",
            error: getScaleLink.data.error
        });
    }

    if (getScaleLink.data.total_scales == 0){
        return res.status(404).json({
            success: false,
            message: "No scale link found for this workspace and username"
        });
    }

    const scaleData = getScaleLink.data.scale_data[0];
    const links = [];

    scaleData.channel_instance_details.forEach(channel => {
        channel.instances_details.forEach(instance => {
            const link = `${learningIndexScaleUrl}?workspace_id=${workspaceId}&username=${username}&channel=${channel.channel_name}&instance=${instance.instance_name}&scale_id=${scaleData.scale_id}`;
            links.push({ link, isActive: false });
        });
    });

    const newLinks = await ScaleLink.create({
        workspaceId,
        channelCount: scaleData.no_of_channels,
        scaleId: scaleData.scale_id,
        scaleName: scaleData.scale_name,
        scaleType: scaleData.scale_type,
        links,
    })

    if (!newLinks){
        return res.status(400).json({
            success: false,
            message: "Failed to save scale link"
        });
    }

    res.status(201).json({
        success: true,
        message: "Scale link saved successfully",
        response: newLinks
    });
});


export {
    saveScaleLink
}