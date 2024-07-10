import { asyncHandler } from "../utils/asyncHandler.js";
import PayloadValidationServices from "../services/validationservices.js";
import { loginSchema } from "../utils/payloadSchema.js";
import { generateAccessToken } from "../utils/helper.js";
import { userLogin } from "../services/api.services.js";

const login = asyncHandler(async (req,res) => {
    const { username, password, workspaceId, institutionName } = req.body

    const validatePayload = PayloadValidationServices.validateData(loginSchema, {
        username: username,
        password: password,
        workspaceId: workspaceId,
        institutionName: institutionName
    });

    console.log(workspaceId);
    if (!validatePayload.isValid){
        return res.status(400)
        .json({
            success: false,
            message: "Invalid payload",
            error: validatePayload.errors
        })
    }

    const user = await userLogin(username, password)

    console.log("userdetais:", user.data);

    if (!user.data.success){
        return res.status(401)
        .json({
            success: false,
            message: "Invalid credentials",
            error: user.data.message
        })
    }

    let role;

    if (workspaceId === user?.data.response[0]?.userinfo?.workspace_id){
        role = "admin";
    }
    else{
        role = "team_member";
    }

    let loggedInToOrg = [];
    user?.data.response?.forEach(item => {
        item.orgs_n_roles.forEach(org => {
            if (org.workspace_id === workspaceId) {
                loggedInToOrg.push(org.workspace_name);
            }
        });
    });

    if(loggedInToOrg.length === 0){
        return res.status(403)
       .json({
            success: false,
            message: "You don't have permission to access this workspace, please contact teacher" ,
       });
    }

    const accessToken = generateAccessToken(username, role, workspaceId, institutionName,loggedInToOrg )


    const cookieOptions = {
        httpOnly: true,
        secure: true
    };

    return res.status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .json({
        success: true,
        message: "Login successful",
        response: {
            username: username,
            role: role,
            workspaceId: workspaceId,
            institutionName: institutionName,
            loggedInToOrg: loggedInToOrg
        },
        accessToken
    })
});

const logout = asyncHandler(async(req, res)=>{
    const cookieOptions = {
        expires: new Date(0),
        httpOnly: true,
        secure: true
    };

    return res.status(200)
   .clearCookie("accessToken", cookieOptions)
   .json({
        success: true,
        message: "Logout successful"
    })
})

const getUserDetails = asyncHandler(async(req, res)=>{
    const user = req.user;

    return res.status(200)
    .json({
        success: true,
        message: "User details fetched successfully",
        response: user
    })
});
export {
    login,
    logout,
    getUserDetails
}