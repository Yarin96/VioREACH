import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { useCallback } from "react";

const BgEffects = () => {
  const particlesInit = useCallback(async (engine: any) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (engine: any) => {
    await loadFull(engine);
  }, []);

  return (
    <div>
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
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",
              },
            },
            mode: {
              push: {
                quantity: 1,
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

export default BgEffects;
