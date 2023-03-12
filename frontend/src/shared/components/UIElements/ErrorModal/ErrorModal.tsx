import { useState } from "react";
import Modal from "../Modal/Modal";
import Button from "../Button/Button";

const ErrorModal = (props: any) => {
  const [show, setShow] = useState(true);

  const clearModal = () => {
    setShow(false);
  };

  return (
    <>
      {show && props.data && props.data.message && (
        <Modal
          onCancel={clearModal}
          header="An Error Occurred!"
          show={!!props.data.message}
          footer={<Button text="Okay" onClick={clearModal} />}
        >
          <p>{props.data.message}</p>
        </Modal>
      )}
    </>
  );
};

export default ErrorModal;
