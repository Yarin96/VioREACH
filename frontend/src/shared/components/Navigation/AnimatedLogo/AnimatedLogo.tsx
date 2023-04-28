import "./AnimatedLogo.css";

const AnimatedLogo = () => {
  return (
    <>
      <div className="loader">
        <div className="square" id="sqr0"></div>
        <div className="square" id="sqr1"></div>
        <div className="square" id="sqr2"></div>
        <div className="square" id="sqr3"></div>
        <div className="square" id="sqr4"></div>
        <div className="square" id="sqr5"></div>
        <div className="square" id="sqr6"></div>
      </div>
    </>
  );
};

export default AnimatedLogo;
