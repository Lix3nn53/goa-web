import axios from "axios";
import tokenService from "./tokenService";
import handleError from "./handleError";

const currentUser = async () => {
  const refreshToken = localStorage.getItem("refreshToken");

  try {
    const res = await axios.get("/api/current_user", {
      headers: { Authorization: `Bearer ${refreshToken}` },
    });

    return { success: true, res };
  } catch (error) {
    return handleError(error);
  }
};

const updateUser = async (values) => {
  try {
    const res = await tokenService.requestWithAccessToken(
      "/api/profile",
      "post",
      values
    );

    return { success: true, res };
  } catch (error) {
    return handleError(error);
  }
};

export default { currentUser, updateUser };
