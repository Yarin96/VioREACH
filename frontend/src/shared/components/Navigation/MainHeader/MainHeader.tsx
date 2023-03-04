import "./MainHeader.css";

const MainHeader = (props: any) => {
  return (
    <>
      <header className="header">{props.children}</header>
    </>
  );
};

export default MainHeader;
