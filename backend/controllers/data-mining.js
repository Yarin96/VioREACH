const axios = require("axios");

const setUpInstagram = async (token) => {
  let code = token;
  let redirectUri = "https://localhost:8443/detection";
  let accessToken = null,
    userId = null,
    result;
  const videosUrls = [];

  try {
    result = await axios.post(
      "https://api.instagram.com/oauth/access_token",
      {
        client_id: process.env.INSTA_APP_ID,
        client_secret: process.env.INSTA_APP_SECRET,
        grant_type: "authorization_code",
        redirect_uri: redirectUri,
        code: code,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    accessToken = result.data.access_token;
    userId = result.data.user_id;
  } catch (error) {
    console.log(error.message);
    return { message: "Authentication Failed!" };
  }

  return {
    message: "Authentication Succeeded!",
    accessToken: accessToken,
  };
};

module.exports = {
  setUpInstagram,
};
