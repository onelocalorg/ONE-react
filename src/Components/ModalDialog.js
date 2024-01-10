import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputComponent from "./InputComponent";
import ToasterComponent from "./ToasterComponent";
import Style from "../Styles/DialogForm.module.css";
import nextarrow from "../images/next-arrow.svg";

function ModalDialog({ hideFunc }) {
  const [activeStep, setActiveStep] = useState(0);
  const handleClose = () => {
    hideFunc(false);
  };

  const validationSchema = [
    yup.object({
      email: yup.string().required("Email is required"),
    }),
    yup.object({
      password: yup.string().required("Password is required"),
    }),
  ];

  const currentValidationSchema = validationSchema[activeStep];

  const {
    trigger,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
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
        <Modal.Header closeButton>
          <div className={Style.modalTitleContainer}>
            <label className={Style.modalTitle}>Enter your Email</label>
          </div>
        </Modal.Header>
        <Modal.Body>
          <form>
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
                  This is required
                </div>
              )}
            </div>

            {activeStep === 1 && (
              <div>
                <InputComponent
                  type={"password"}
                  placeholder={"Password"}
                  register={register}
                  inputRef={"password"}
                  name={"password"}
                  className={Style.inputField}
                />
                {errors.password && errors.password.type === "required" && (
                  <div role="alert" className={Style.error}>
                    This is required
                  </div>
                )}
              </div>
            )}
          </form>
        </Modal.Body>
        <Modal.Footer>
          {activeStep === 0 && (
            <button className={Style.formButton} onClick={handleNext}>
              <span className={Style.btnText}>NEXT</span>
              <span className={Style.arrowIcon}>
                <img src={nextarrow} alt="arrow" />
              </span>
            </button>
          )}
          {activeStep === 1 && (
            <button
              className={Style.formButton}
              onClick={handleSubmit(onSubmit)}
            >
              <span className={Style.btnText}>SIGN IN</span>
              <span className={Style.arrowIcon}>
                <img src={nextarrow} alt="arrow" />
              </span>
            </button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalDialog;
