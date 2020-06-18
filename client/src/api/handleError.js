export default (error) => {
  if (error.response && error.response.data) {
    if (error.response.data.message) {
      return { success: false, errorMessage: error.response.data.message };
    } else {
      return {
        success: false,
        errorMessage: error.response.status + " " + error.response.statusText,
      };
    }
  }

  return { success: false, errorMessage: error.message };
};
