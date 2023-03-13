import Modal from "../Modal/Modal";
import Button from "../Button/Button";

const ErrorModal = (props: any) => {
  return (
    <Modal
      onCancel={props.onClear}
      header="An Error Occurred!"
      show={!!props.error.message}
      footer={<Button text="Okay" onClick={props.onClear} />}
    >
      <p>{props.error.message}</p>
    </Modal>
  );
};

export default ErrorModal;
