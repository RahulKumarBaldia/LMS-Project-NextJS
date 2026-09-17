import {
  signupUser,
  loginUser,
} from "@/services/authService";

export const signup = async (data) => {
  return await signupUser(data);
};

export const login = async (data) => {
  return await loginUser(data);
};