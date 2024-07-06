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

export {
    userLogin
}