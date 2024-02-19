import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputComponent from "./InputComponent";
import Style from "../Styles/DialogForm.module.css";
import closeIcon from "../images/close-icon.svg";
import ToasterSuccess from "./ToasterSuccess";
import ToasterError from "./ToasterComponent";
import { setUserData } from "../Redux/slices/UserSlice";
import { useDispatch } from "react-redux";
import { EMAIL_FORMAT, REQUIRED_FIELD_MESSAGE } from "../utils/AppConstants";

function PayoutModalDialog({ hideFunc, addPayoutType, setloadingFunc }) {
  const dispatch = useDispatch();

  const handleClose = () => {
    hideFunc(false);
  };

  const validationSchema = [
    yup.object({
      email: yup
        .string()
        .required(REQUIRED_FIELD_MESSAGE)
        .email("Invalid Email")
        .matches(EMAIL_FORMAT, "Invalid Email"),
    }),
    yup.object({
      email: yup
        .string()
        .required(REQUIRED_FIELD_MESSAGE)
        .email("Invalid Email")
        .matches(EMAIL_FORMAT, "Invalid Email"),
      password: yup
        .string()
        .required(REQUIRED_FIELD_MESSAGE)
        .min(8, "password must be at least 8 characters")
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d).+$/,
          "Password must contain at least 1 letter and 1 number"
        ),
    }),
  ];

  const {
    trigger,
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    setloadingFunc(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
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
              <label className={Style.modalTitle}>Add Breakdown</label>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleFormSubmit}>
            <div className={Style.dialogItem}>
              <div className={Style.dialogItemLabel}>Who:</div>
              <div style={{ width: "100%" }}>
                <InputComponent
                  type={"text"}
                  placeholder={"Select who to pay"}
                  register={register}
                  inputRef={"email"}
                  name={"email"}
                  className={Style.inputField}
                />
                {errors.email &&
                  (errors.email.type === "required" ||
                    errors.email.type === "email" ||
                    errors.email.type === "matches") && (
                    <div role="alert" className={Style.error}>
                      {errors?.email?.message}
                    </div>
                  )}
              </div>
            </div>
            <div className={Style.dialogItem}>
              <div className={Style.dialogItemLabel}>Type:</div>
              <div style={{ width: "100%" }}>
                <span>Expense</span>
                <span>
                  <button className={Style.payoutBtn}>Payout</button>
                </span>
              </div>
            </div>
            <div className={Style.dialogItem}>
              <div className={Style.dialogItemLabel}>Amount:</div>
              <div style={{ width: "100%" }}>
                <span>$</span>
                <span>%</span>
                <span>$10.00</span>
              </div>
            </div>
            <div className={Style.dialogItem}>
              <div className={Style.dialogItemLabel}>Description:</div>
              <div
                style={{
                  width: "100%",
                  textAlign: "right",
                }}
              >
                <span>
                  Payout for Sunday Circle <br />
                </span>
                <span>on Jan 30th 2024</span>
              </div>
            </div>
            <div className={Style.dialogItem}>
              <div className={Style.dialogItemLabel}>Media:</div>
              <div
                style={{
                  width: "100%",
                  textAlign: "right",
                }}
              >
                <span>
                  <button className={Style.photoBtn}>Add Photos</button>
                </span>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  );
}

export default PayoutModalDialog;
