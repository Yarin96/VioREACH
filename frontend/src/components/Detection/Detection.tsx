import React, { useState, useCallback } from "react";
import axios from "axios";
import "./Detection.css";
import Button from "../../shared/components/UIElements/Button/Button";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const Detection: React.FC = () => {
  const particlesInit = useCallback(async (engine: any) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (engine: any) => {
    await loadFull(engine);
  }, []);

  const [result, setResult] = useState(null);

  const accessToken = process.env.REACT_APP_INSTAGRAM_API_KEY;
  const fields = "id,caption,media_type,media_url,thumbnail_url";
  const url = `https://graph.instagram.com/me/media?fields=${fields}&access_token=${accessToken}`;

  const sendDataToServer = async (videos: any) => {
    try {
      const tempToken = localStorage.getItem("token");
      const response: any = await axios.post(
        "http://127.0.0.1:5000/detection",
        {
          video_url: videos[1],
        },
        {
          headers: {
            Authorization: `Bearer ${tempToken}`,
          },
        }
      );

      setResult(response);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const clickHandler = async () => {
    const fetchVideosFromAPI = async () => {
      const videosUrls = [];

      try {
        const response = await axios.get(url);
        const fetchedData = await response.data;

        for (const item of fetchedData.data) {
          if (item.media_type === "VIDEO") {
            videosUrls.push(item.media_url);
          }
        }

        return videosUrls;
      } catch (error: any) {
        console.log(error.message);
      }
    };

    const result = await fetchVideosFromAPI();
    console.log(result);
    sendDataToServer(result);
  };

  return (
    <div className="detect-container">
      <h2>The Violence Detection Scanner!</h2>
      <h3>
        Click the button to start scanning your social media account using our
        algorithm.
      </h3>
      <Button text="Start Scanning" onClick={clickHandler} />
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          background: {
            color: {
              value: "#E6E4E4",
            },
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              // onClick: {
              //   enable: true,
              //   mode: "push",
              // },
              onHover: {
                enable: true,
                mode: "repulse",
              },
            },
            mode: {
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 100,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: "#00BFFF",
            },
            links: {
              enable: true,
              width: 1,
              opacity: 1,
              distance: 150,
            },
            move: {
              enable: true,
              direction: "none",
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 2,
              straight: false,
            },
            collisions: {
              enable: true,
            },
            number: {
              value: 15,
              density: {
                enable: true,
                area: 800,
              },
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 3, max: 3 },
            },
          },
          detectRetina: true,
        }}
      />
    </div>
  );
};

export default Detection;
