import axios from "axios";
import { loginURL, scaleURL } from "../utils/helper.js";

const loginServicesAxiosInstance = axios.create({
    baseURL: loginURL
});

const scaleServiceAxiosInstance = axios.create({
  baseURL: scaleURL
});

const userLogin = async (username,password) => {
    return await loginServicesAxiosInstance.post(
      `/api/check_user/`,
      { username, password }
    );
  };


const getScaleLinkForLearningLevelIndex = async (workspaceId,username) => {
  return await scaleServiceAxiosInstance.get(
    `v3/?workspace_id=${workspaceId}&username=${username}&scale_type=learning_index`
  );
};
export {
    userLogin,
    getScaleLinkForLearningLevelIndex
}