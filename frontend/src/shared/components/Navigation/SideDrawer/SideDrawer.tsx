import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import "./SideDrawer.css";

const SideDrawer = (props: any) => {
  const content = (
    <CSSTransition
      in={props.show}
      timeout={300}
      classNames={{
        enter: "slide-in-left-enter",
        enterActive: "slide-in-left-enter-active",
        exit: "slide-in-left-exit",
        exitActive: "slide-in-left-exit-active",
      }}
      mountOnEnter
      unmountOnExit
    >
      <aside className="side_drawer">
        <div onClick={props.onClick}>{props.children}</div>
      </aside>
    </CSSTransition>
  );

  return ReactDOM.createPortal(
    content,
    document.getElementById("drawer-hook")!
  );
};

export default SideDrawer;
