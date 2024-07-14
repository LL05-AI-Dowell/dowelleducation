import { asyncHandler } from "../utils/asyncHandler.js";
import PayloadValidationServices from "../services/validationservices.js";
import { ScalelinkSchema, updateScaleLinkSchema } from "../utils/payloadSchema.js";
import ScaleLink from "../models/scaleLink.schema.js";
import { getScaleLinkForLearningLevelIndex } from "../services/api.services.js";
import { learningIndexScaleUrl } from "../utils/helper.js"


const saveScaleLink = asyncHandler(async (req, res) => {
    const { workspaceId, username } = req.body;

    const validatePayload = PayloadValidationServices.validateData(ScalelinkSchema, {
        workspaceId: workspaceId,
        username: username
    });

    if (!validatePayload.isValid) {
        return res.status(400).json({
            success: false,
            message: "Invalid payload",
            error: validatePayload.errors
        });
    }

    const getScaleLink = await getScaleLinkForLearningLevelIndex(workspaceId, username);

    if (!getScaleLink.data.success) {
        return res.status(400).json({
            success: false,
            message: "Error fetching scale link",
            error: getScaleLink.data.error
        });
    }

    if (getScaleLink.data.total_scales === 0) {
        return res.status(404).json({
            success: false,
            message: "No scale link found for this workspace and username"
        });
    }

    const scaleData = getScaleLink.data.scale_data;
    let newLinksCreated = false;

    for (const scale of scaleData) {
        const existingScaleLink = await ScaleLink.findOne({
            workspaceId: workspaceId,
            scaleId: scale.scale_id,
            scaleName: scale.scale_name,
            scaleType: scale.scale_type
        });

        if (existingScaleLink) {
            console.log(`Scale link ${scale.scale_name} already exists. Skipping.`);
            continue;
        }

        const links = [];
        scale.channel_instance_details.forEach(channel => {
            channel.instances_details.forEach(instance => {
                console.log(channel.channel_display_name);
                const link = `${learningIndexScaleUrl}?workspace_id=${workspaceId}&username=${username}&channel=${channel.channel_name}&instance=${instance.instance_name}&scale_id=${scale.scale_id}`;
                links.push({
                    link,
                    isActive: false,
                    channelDisplayName: channel.channel_display_name,
                    instanceDisplayName: instance.instance_display_name
                });
            });
        });

        const newLinks = await ScaleLink.create({
            workspaceId,
            channelCount: scale.no_of_channels,
            scaleId: scale.scale_id,
            scaleName: scale.scale_name,
            scaleType: scale.scale_type,
            links,
        });

        if (!newLinks) {
            return res.status(400).json({
                success: false,
                message: "Failed to save scale link"
            });
        }

        newLinksCreated = true;
        console.log(`Scale link ${scale.scale_name} saved successfully.`);
    }

    if (!newLinksCreated) {
        return res.status(200).json({
            success: true,
            message: "All scale links already exist. No new scale links were created."
        });
    }

    res.status(201).json({
        success: true,
        message: "Scale links saved successfully"
    });
});




const getALlScaleLinks = asyncHandler(async(req, res)=>{
    const workspaceId = req.params.id;

    if(!workspaceId){
        return res.status(400).json({
            success: false,
            message: "Invalid workspaceId"
        });
    }
    const scaleLinks = await ScaleLink.find({workspaceId});

    if (!scaleLinks){
        return res.status(404).json({
            success: false,
            message: "No scale links found"
        });
    }

    res.status(200).json({
        success: true,
        message: "All scales fetched successfully",
        response: scaleLinks
    });
})

const activateScalelinks = asyncHandler(async (req, res) => {
    const { workspaceId, linkId } = req.query;

    const validatePayload = PayloadValidationServices.validateData(updateScaleLinkSchema, {
        workspaceId: workspaceId,
        linkId: linkId
    });

    if (!validatePayload.isValid) {
        return res.status(400).json({
            success: false,
            message: "Invalid payload",
            error: validatePayload.errors
        });
    }

    const scaleLinks = await ScaleLink.find({ workspaceId });

    if (scaleLinks.length === 0) {
        return res.status(404).json({
            success: false,
            message: "No scale links found"
        });
    }

    const updatedLinks = [];
    let targetLinkFound = false;
    let targetLinkStatusChanged = false;

    for (let scaleLink of scaleLinks) {
        for (let link of scaleLink.links) {
            if (link._id.toString() === linkId) {
                targetLinkFound = true;
                if (link.isActive) {
                    link.isActive = false;
                    targetLinkStatusChanged = true;
                } else {
                    link.isActive = true;
                    targetLinkStatusChanged = true;
                }
            } else if (link.isActive) {
                link.isActive = false;
            }
        }
        updatedLinks.push(scaleLink.save());
    }

    if (!targetLinkFound) {
        return res.status(404).json({
            success: false,
            message: "Target link not found"
        });
    }

    await Promise.all(updatedLinks);

    const responseMessage = targetLinkStatusChanged 
        ? "Link status updated successfully"
        : "No changes made to the link status";

    return res.status(200).json({
        success: true,
        message: responseMessage
    });
});

const getActiveLink = asyncHandler(async (req, res) => {
    const { id: workspaceId } = req.params;
  
    if (!workspaceId) {
      return res.status(400).json({
        success: false,
        message: "Invalid workspaceId",
      });
    }
  
    const scaleLinks = await ScaleLink.find({ workspaceId });
  
    if (scaleLinks.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No scale links found",
      });
    }
 
    const activeLinks = scaleLinks.reduce((acc, scale) => {
      const activeLinksInScale = scale.links.filter(link => link.isActive).map(link => link.link);
      return acc.concat(activeLinksInScale);
    }, []);
  
    if (activeLinks.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No active links found",
      });
    }
  
    res.status(200).json({
      success: true,
      message: "Active links fetched successfully",
      links: activeLinks,
    });
  });
  
  

export {
    saveScaleLink,
    getALlScaleLinks,
    activateScalelinks,
    getActiveLink
}
