import axios from "axios";
import { loginURL } from "./constant";

const loginServicesAxiosInstance = axios.create({
    baseURL: loginURL
});

const userLogin = async (username,password) => {
    return await loginServicesAxiosInstance.post(
      `/api/check_user/`,
      { username, password }
    );
  };

// TODO: Remove this function
const userLoginWithFaceId = async ( image ) => {
  return await loginServicesAxiosInstance.post(
    `/api/face_id_login_face_id/`,
    { image }
  );
};

export {
    userLogin,
    userLoginWithFaceId
}