import axios from "axios";
import { retrieveToken } from "../utils/helper";
const servicesAxiosInstance = axios.create({
  baseURL: "http://localhost:5000"
});

const userLogin = async (username, password, workspaceId, institutionName) => {
  return await servicesAxiosInstance.post(
    `/api/v1/auth/login`,
    { username, password, workspaceId, institutionName }
  );
};

const userLogout = async() => {
  const headers = {
    Authorization: `Bearer ${retrieveToken()}`,
  };
  return await servicesAxiosInstance.get(
    `/api/v1/auth/logout`,
    {headers}
  )
}

const userProfile = async () => {
  const headers = {
    Authorization: `Bearer ${retrieveToken()}`,
  };
  return await servicesAxiosInstance.get(
    `/api/v1/auth/user-details`,
    {headers}
  )
}
export {
  userLogin,
  userLogout,
  userProfile
}
