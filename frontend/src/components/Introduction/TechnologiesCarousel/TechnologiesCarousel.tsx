import SVGList from "./SVGList";
import "./TechnologiesCarousel.css";

const TechnologiesCarousel = () => {
  return (
    <div className="logos">
      <div className="logos_slide">
        <SVGList />
      </div>
      <div className="logos_slide">
        <SVGList />
      </div>
    </div>
  );
};

export default TechnologiesCarousel;
