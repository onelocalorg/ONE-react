import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Style from "../Styles/DialogForm.module.css";
import nextarrow from "../images/next-arrow.svg";
import closeIcon from "../images/close-icon.svg";
import BillingAddress from "./BillingAddress";
import CardInfo from "./CardInfo";

function PurchaseModalDialog({ hideFunc }) {
  const [activeStep, setActiveStep] = useState(0);
  const handleClose = () => {
    hideFunc(false);
  };

  const validationSchema = [
    yup.object({
      nameoncard: yup.string().required("Name on card is required"),
    }),
  ];

  const currentValidationSchema = validationSchema[activeStep];

  const {
    trigger,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(currentValidationSchema),
  });

  const onSubmit = async (data) => {
    console.log(data);
  };

  const handleNext = async () => {
    const isStepValid = await trigger();
    if (isStepValid) setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  return (
    <div className="module-dialog">
      <Modal
        show
        onHide={handleClose}
        className={Style.modalItem}
        backdrop="static"
      >
        <Modal.Header>
          <div className={Style.modalHeader}>
            <div className={Style.closeIcon} onClick={handleClose}>
              <img src={closeIcon} alt="close" />
            </div>
            <div className={Style.modalTitleContainer}>
              <label className={Style.modalTitle}>Purchase</label>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <form>
            <CardInfo register={register} errors={errors} formStyle={Style} />
            <BillingAddress
              register={register}
              errors={errors}
              formStyle={Style}
            />
          </form>
        </Modal.Body>
        <Modal.Footer className={Style.purchaseFooter}>
          <button
            className={Style.purchaseformButton}
            onClick={handleSubmit(onSubmit)}
          >
            <span className={Style.purchasebtnText}>Pay $[total]</span>
            <span className={Style.purchseArrowIconContainer}>
              <img
                src={nextarrow}
                alt="arrow"
                className={Style.purchseArrowIcon}
              />
            </span>
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default PurchaseModalDialog;
