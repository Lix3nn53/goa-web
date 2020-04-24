import axios from "axios";

const localAuth = async (emailOrUsername, password) => {
  try {
    const res = await axios.post("/auth/local", {
      emailOrUsername: emailOrUsername,
      password: password,
    });

    if (res.data.refreshToken && res.data.accessToken) {
      localStorage.setItem("refreshToken", res.data.refreshToken);
      localStorage.setItem("accessToken", res.data.accessToken);

      return { success: true };
    } else {
      return { success: false, errorMessage: res.data.errorMessage };
    }
  } catch (error) {
    if (error.response && error.response.data) {
      return { success: false, errorMessage: error.response.data.message };
    }

    return { success: false };
  }
};

const localAuthRegister = async (
  email,
  username,
  password,
  passwordConfirm
) => {
  try {
    const res = await axios.post("/auth/local/register", {
      email,
      username,
      password,
      passwordConfirm,
    });

    if (res.data.success) {
      return { success: true };
    } else {
      return { success: false, errorMessage: res.data.errorMessage };
    }
  } catch (error) {
    if (error.response && error.response.data) {
      return { success: false, errorMessage: error.response.data.message };
    }

    return { success: false };
  }
};

const logout = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");

    await axios.get("/api/logout", {
      headers: { Authorization: `Bearer ${refreshToken}` },
    });

    localStorage.removeItem("refreshToken");
    localStorage.removeItem("accessToken");

    return true;
  } catch (error) {
    return false;
  }
};

const resendConfirmationMail = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");

    const res = await axios.get("/auth/local/register/resend", {
      headers: { Authorization: `Bearer ${refreshToken}` },
    });

    if (res.data.success) {
      return { success: true };
    } else {
      return { success: false, errorMessage: res.data.errorMessage };
    }
  } catch (error) {
    if (error.response && error.response.data) {
      return { success: false, errorMessage: error.response.data.message };
    }

    return { success: false };
  }
};

export default { localAuth, localAuthRegister, logout, resendConfirmationMail };
