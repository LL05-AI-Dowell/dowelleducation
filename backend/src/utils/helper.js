import JWT from "jsonwebtoken";
import config from "../config/index.js";

const loginURL = "https://100014.pythonanywhere.com";
// const frontend_url = "http://localhost:5173/dowelleducation/";
const frontend_url = "https://www.samantaedu.uxlivinglab.online/dowelleducation";
const scaleURL = "https://100035.pythonanywhere.com/addons/create-scale/"
const learningIndexScaleUrl = "https://www.uxlive.me/dowellscale/samanta-edu/"

const generateAccessToken = (username, role, workspaceId, institutionName, loggedInToOrg) => {
    return JWT.sign(
        {
            username: username,
            role: role,
            workspaceId: workspaceId,
            institutionName: institutionName,
            loggedInToOrg: loggedInToOrg,
        },
        config.JWT_SECRET,
        {
            expiresIn: config.JWT_EXPIRY
        }
    );
};


const createDowellEducationURL = (workspaceId, username, institutionName) => {
    return `${frontend_url}/?workspace_id=${workspaceId}&institution_name=${institutionName}`;
}

export {
    generateAccessToken,
    loginURL,
    createDowellEducationURL,
    scaleURL,
    learningIndexScaleUrl
};
