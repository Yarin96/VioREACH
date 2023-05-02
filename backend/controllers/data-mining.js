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

    const fields = "id,caption,media_type,media_url,thumbnail_url";
    const url = `https://graph.instagram.com/me/media?fields=${fields}&access_token=${accessToken}`;

    // get data from user account
    response = await axios.get(url);

    const fetchedData = response.data;
    if (!fetchedData) return console.log("No valid data found.");

    for (const item of fetchedData.data) {
      if (item.media_type === "VIDEO") {
        videosUrls.push(item.media_url);
      }
    }
  } catch (error) {
    console.log(error.message);
    return { message: "Authentication Failed!", videoList: [] };
  }

  console.log(videosUrls);
  return { message: "Authentication Succeeded!", videoList: videosUrls };
};

module.exports = {
  setUpInstagram,
};
