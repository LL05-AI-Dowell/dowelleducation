import { asyncHandler } from "../utils/asyncHandler.js";
import PayloadValidationServices from "../services/validationservices.js";
import { linkSchema } from "../utils/payloadSchema.js";
import Link from "../models/link.schema.js";
import { createDowellEducationURL } from "../utils/helper.js";

const createLink = asyncHandler(async(req, res)=>{
    const { workspaceId, institutionName, username } = req.body

    const validatePayload = PayloadValidationServices.validateData(linkSchema, {
        workspaceId: workspaceId,
        institutionName: institutionName,
        username: username
    });

    if (!validatePayload.isValid){
        return res.status(400)
        .json({
            success: false,
            message: "Invalid payload",
            error: validatePayload.errors
        })
    }

    const countOfLink = await Link.find({ workspaceId: workspaceId})
    

    if (countOfLink.length >= 1){
        return res.status(400)
        .json({
            success: false,
            message: "Link already exists for this workspace, You can not create more than one link"
       })
    }

    const newLink = createDowellEducationURL(workspaceId, username, institutionName)

    const link = await Link.create({
        workspaceId: workspaceId,
        institutionName: institutionName,
        username: username,
        link: newLink
    });

    if(!link){
        return res.status(400)
        .json({
            success: false,
            message: "Failed to create link"
       })
    }

    return res.status(200)
    .json({
        success: true,
        message: "Link created successfully",
        response: link
    })
});

const getLink = asyncHandler(async(req, res) => {
    const workspaceId = req.params.workspaceId
    if(!workspaceId){
        return res.status(400)
        .json({
            success: false,
            message: "Please provide workspaceId"
       })
    }
    const link = await Link.find({ workspaceId: workspaceId });

    if(!link){
        return res.status(404)
        .json({
            success: false,
            message: "Link not found , Create one."
       })
    }

    return res.status(200)
    .json({
        success: true,
        message: "Link fetched successfully",
        response: link
    })
});


export { createLink, getLink };