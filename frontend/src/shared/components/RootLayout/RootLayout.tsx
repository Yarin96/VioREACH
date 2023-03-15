import React, { useCallback } from "react";
import { Outlet } from "react-router-dom";
import MainNavigation from "../Navigation/MainNavigation/MainNavigation";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const RootLayout: React.FC = () => {
  const particlesInit = useCallback(async (engine: any) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (engine: any) => {
    await loadFull(engine);
  }, []);

  return (
    <div>
      <MainNavigation />
      <main>
        <Particles
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
          options={{
            background: {
              color: {
                value: "#696969",
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
                value: "#FFA500",
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
                value: 50,
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
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
