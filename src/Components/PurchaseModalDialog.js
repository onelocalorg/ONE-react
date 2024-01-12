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
import CardList from "./CardList";
import CreatePassword from "./CreatePassword";
import ReferedBy from "./ReferedBy";
import InputComponent from "./InputComponent";
const errorRequired = "This field is required";

function PurchaseModalDialog({
  hideFunc,
  purchaseTotal,
  showRegister,
  showBillingInformation,
  setShowBillingInformation,
  userEmail,
  activePurchaseStep,
}) {
  const handleClose = () => {
    hideFunc(false);
  };

  const validationSchema = [
    yup.object({
      email: yup.string().required(errorRequired).email("Invalid Email"),
      nameoncard: yup.string().required(errorRequired),
      country: yup.string().required(errorRequired),
      address1: yup.string().required(errorRequired),
      city: yup.string().required(errorRequired),
      state: yup.string().required(errorRequired),
      zip: yup.string().required(errorRequired),
      password: yup.string().required(errorRequired),
      confirmpassword: yup
        .string()
        .required(errorRequired)
        .oneOf([yup.ref("password")], "Password do not match"),
    }),
  ];

  const currentValidationSchema = validationSchema[activePurchaseStep];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(currentValidationSchema),
    defaultValues: {
      savedcard: "33",
      email: userEmail,
    },
  });

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <div className="module-dialog">
      <Modal
        show
        onHide={handleClose}
        className={`${Style.modalItem} ${Style.purchaseModalItem}`}
        backdrop="static"
      >
        <Modal.Header>
          <div className={Style.modalHeader}>
            <div
              className={Style.closeIcon}
              onClick={handleClose}
              aria-hidden="true"
            >
              <img src={closeIcon} alt="close" />
            </div>
            <div className={Style.modalTitleContainer}>
              <label className={Style.modalTitle}>{`${
                showBillingInformation ? "Add Card" : "Purchase"
              }`}</label>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <form>
            {showRegister && (
              <div>
                <div className={Style.fieldHeading}>Email *</div>
                <div>
                  <InputComponent
                    type={"text"}
                    placeholder={"Email"}
                    register={register}
                    inputRef={"email"}
                    name={"email"}
                    className={Style.inputField}
                  />
                  {errors.email && errors.email.type === "required" && (
                    <div role="alert" className={Style.error}>
                      {errors?.email?.message}
                    </div>
                  )}
                </div>
              </div>
            )}
            <CardInfo
              register={register}
              errors={errors}
              formStyle={Style}
              showBillingInformation={showBillingInformation}
              showBillingFunc={setShowBillingInformation}
            />
            {showBillingInformation && (
              <BillingAddress
                register={register}
                errors={errors}
                formStyle={Style}
              />
            )}
            {!showRegister && <CardList register={register} errors={errors} />}
            {showRegister && (
              <>
                <CreatePassword
                  register={register}
                  errors={errors}
                  formStyle={Style}
                />
                <ReferedBy register={register} formStyle={Style} />
              </>
            )}
          </form>
        </Modal.Body>
        <Modal.Footer className={Style.purchaseFooter}>
          <button
            className={Style.purchaseformButton}
            onClick={handleSubmit(onSubmit)}
          >
            <span className={Style.purchasebtnText}>
              Pay ${`${purchaseTotal}`}
            </span>
            <span className={Style.purchseArrowIconContainer}>
              <img
                src={nextarrow}
                alt="arrow"
                className={Style.purchseArrowIcon}
              />
            </span>
          </button>
          {showRegister && (
            <div>
              <input type="radio" id="terms" defaultChecked />
              <label htmlFor="terms" className={Style.termLable}>
                I agree to the{" "}
                <span className={Style.termInnerText}>
                  terms and conditions
                </span>
              </label>
            </div>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default PurchaseModalDialog;
