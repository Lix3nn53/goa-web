import axios from "axios";

const refreshAccessTokenRequest = async () => {
  const refreshToken = localStorage.getItem("refreshToken");

  if (!refreshToken) return false;

  try {
    const res = await axios.get("/api/refreshAccessToken", {
      headers: { Authorization: `Bearer ${refreshToken}` },
    });

    if (res.data.accessToken) {
      return res.data.accessToken;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

const refreshAccessToken = async () => {
  const accessToken = await refreshAccessTokenRequest();

  if (accessToken) {
    console.log(`new accessToken: ${accessToken}`);
    localStorage.setItem("accessToken", accessToken);

    return true;
  }

  return false;
};

const onRequestErrorRefreshAcessToken = async (error) => {
  if (
    error.response &&
    error.response.data &&
    error.response.data.errorMessage
  ) {
    if (error.response.data.errorMessage === "Not Authenticated") {
      const accessToken = await refreshAccessToken();

      if (!accessToken) {
        console.log(`refresh fail`);
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("accessToken");

        return false;
      }

      return true;
    }
  }

  return false;
};

const requestWithAccessToken = async (route, requestType, params) => {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
      return { success: false, errorMessage: "You are not logged in" };
    } else {
      const res = await refreshAccessToken();

      if (!res) {
        return { success: false, errorMessage: "You are not logged in" };
      }
    }
  }

  try {
    var response;

    if (requestType === "post") {
      response = await axios.post(route, params, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
    } else if (requestType === "get") {
      response = await axios.get(route, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
    }

    return response;
  } catch (error) {
    const refresh = await onRequestErrorRefreshAcessToken(error);

    if (!refresh) {
      return { success: false, errorMessage: "You are not logged in" };
    }

    return await requestWithAccessToken(route, requestType, params);
  }
};

export default { requestWithAccessToken };
