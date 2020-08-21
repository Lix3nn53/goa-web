import axios from "axios";

const localAuth = async (emailOrUsername, password) => {
  try {
    const res = await axios.post("/auth/local", {
      emailOrUsername: emailOrUsername,
      password: password,
    });

    return handleAuthResponse(res);
  } catch (error) {
    if (error.response && error.response.data) {
      return { success: false, errorMessage: error.response.data.message };
    }

    return { success: false };
  }
};

const googleAuth = async (params) => {
  try {
    const res = await axios.get("/auth/google" + params);

    return handleAuthResponse(res);
  } catch (error) {
    if (error.response && error.response.data) {
      return { success: false, errorMessage: error.response.data.message };
    }

    return { success: false };
  }
};

const facebookAuth = async (params) => {
  try {
    const res = await axios.get("/auth/facebook" + params);

    return handleAuthResponse(res);
  } catch (error) {
    if (error.response && error.response.data) {
      return { success: false, errorMessage: error.response.data.message };
    }

    return { success: false };
  }
};

const handleAuthResponse = (res) => {
  if (res.data.refreshToken && res.data.accessToken) {
    localStorage.setItem("refreshToken", res.data.refreshToken);
    localStorage.setItem("accessToken", res.data.accessToken);

    return { success: true };
  } else {
    return { success: false, errorMessage: res.data.errorMessage };
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
  const refreshToken = localStorage.getItem("refreshToken");

  localStorage.removeItem("refreshToken");
  localStorage.removeItem("accessToken");

  try {
    await axios.get("/api/logout", {
      headers: { Authorization: `Bearer ${refreshToken}` },
    });
    return true;
  } catch (error) {
    return false;
  }
};

const resendConfirmationMail = async () => {
  const refreshToken = localStorage.getItem("refreshToken");

  if (!refreshToken) return false;

  try {
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

export default {
  localAuth,
  localAuthRegister,
  logout,
  resendConfirmationMail,
  googleAuth,
  facebookAuth,
};
