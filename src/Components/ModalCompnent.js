import Modal from "react-bootstrap/Modal";
import Style from "../Styles/DialogForm.module.css";

function ModalComponent({
  show,
  hideFunc,
  header,
  body,
  footer,
  className,
  wrapperClassname,
}) {
  return (
    <div className={`module-dialog ${wrapperClassname}`}>
      <Modal
        show={show}
        onHide={hideFunc}
        // backdrop="static"
        className={className}
      >
        <Modal.Header closeButton>{header}</Modal.Header>
        <Modal.Body>{body}</Modal.Body>
        <Modal.Footer>{footer}</Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalComponent;
