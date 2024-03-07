import Modal from "react-bootstrap/Modal";
import Style from "../Styles/DialogForm.module.css";

function ModalComponent({ show, hideFunc, header, body, footer }) {
  return (
    <div className="module-dialog">
      <Modal
        show={show}
        onHide={hideFunc}
        className={Style.modalItem}
        backdrop="static"
      >
        <Modal.Header>{header}</Modal.Header>
        <Modal.Body>{body}</Modal.Body>
        <Modal.Footer>{footer}</Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalComponent;
