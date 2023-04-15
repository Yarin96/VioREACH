import React, { useState } from "react";
import axios from "axios";

const InstagramAuth = () => {
  const [loading, setLoading] = useState(false);

  const handleInstagramAuth = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8080/instagram-auth");
      window.location.href = response.data.redirectUrl;
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>Instagram Authorization</h2>
      <button disabled={loading} onClick={handleInstagramAuth}>
        {loading ? "Loading..." : "Authorize with Instagram"}
      </button>
    </div>
  );
};

export default InstagramAuth;
