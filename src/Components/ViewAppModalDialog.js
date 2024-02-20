import Modal from "react-bootstrap/Modal";
import Style from "../Styles/DialogForm.module.css";
// import closeIcon from "../images/close-icon.svg";
import bellIcon from "../images/bell-icon.png";

function ViewAppModalDialog({ hideFunc }) {
  const handleClose = () => {
    hideFunc(false);
  };

  return (
    <div className="module-dialog">
      <Modal
        show
        onHide={handleClose}
        className={Style.modalItem}
        backdrop="static"
        style={{ paddingLeft: 0 }}
      >
        <Modal.Header>
          <div className={Style.modalHeader}>
            {/* <div className={Style.closeIcon} onClick={handleClose}>
              <img src={closeIcon} alt="close" />
            </div> */}
            <div className={Style.modalTitleContainer}></div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className={Style.viewAppDialogItem}>
            <div className={`${Style.viewAppSubItem} ${Style.viewAppBellIcon}`}>
              <img src={bellIcon} alt="alert" />
            </div>
            <div className={`${Style.viewAppSubItem} ${Style.alreadyText}`}>
              Already have the app?
            </div>
            <div className={`${Style.viewAppSubItem}`}>
              <a href="https://apps.apple.com/in/app/one-local/id1534246640">
                <button className={`${Style.viewAppBtn} ${Style.viewBtn}`}>
                  View in the app
                </button>
              </a>
            </div>
            <div className={`${Style.viewAppSubItem}`}>OR</div>
            <div className={`${Style.viewAppSubItem}`}>
              <a href="https://apps.apple.com/in/app/one-local/id1534246640">
                <button
                  className={`${Style.viewAppBtn} ${Style.downloadAppBtn} `}
                >
                  Download the app
                </button>
              </a>
            </div>
            <div className={`${Style.viewAppSubItem}`}>OR</div>
            <div className={`${Style.viewAppSubItem}`}>
              <button
                className={`${Style.viewAppBtn} ${Style.continueAppBtn}`}
                onClick={handleClose}
              >
                Continue in web view
              </button>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  );
}

export default ViewAppModalDialog;
