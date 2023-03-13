import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import { useState, useEffect } from "react";

const ErrorModal = (props: any) => {
  const [state, setState] = useState(false);

  useEffect(() => {
    setState(!!props.error.message);
  }, [props.error.message]);

  return (
    <Modal
      onCancel={props.onClear}
      header="An Error Occurred!"
      show={state}
      footer={<Button text="Okay" onClick={props.onClear} />}
    >
      <p>{props.error.message}</p>
    </Modal>
  );
};

export default ErrorModal;
