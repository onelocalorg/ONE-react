import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputComponent from "./InputComponent";
import Style from "../Styles/DialogForm.module.css";
import nextarrow from "../images/next-arrow.svg";
import closeIcon from "../images/close-icon.svg";
import { getUserByEmail, logInApi } from "../api/services";

function EmailModalDialog({
  hideFunc,
  purchaseFunc,
  setloadingFunc,
  setShowRegister,
  setShowBillingInformation,
  setUserEmail,
}) {
  const [activeStep, setActiveStep] = useState(0);

  const handleClose = () => {
    hideFunc(false);
  };

  const validationSchema = [
    yup.object({
      email: yup.string().required("Email is required").email("Invalid Email"),
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
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(currentValidationSchema),
  });

  const onSubmit = async (data) => {
    setloadingFunc(true);
    const response = await logInApi(data);

    setloadingFunc(false);
    purchaseFunc(true);
    handleClose();
  };

  const handleNext = async () => {
    const formValues = getValues();
    const isStepValid = await trigger();

    if (isStepValid) {
      setloadingFunc(true);
      setUserEmail(formValues?.email);
      const response = await getUserByEmail(formValues?.email);

      setloadingFunc(false);
      if (response?.isAvailable) {
        setShowRegister(false);
        setShowBillingInformation(false);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      } else {
        setShowRegister(true);
        purchaseFunc(true);
        setShowBillingInformation(true);
        handleClose();
      }
    }
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
              <label className={Style.modalTitle}>Enter your Email</label>
            </div>
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
              {errors.email &&
                (errors.email.type === "required" ||
                  errors.email.type === "email") && (
                  <div role="alert" className={Style.error}>
                    {errors?.email?.message}
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
              <span className={Style.btnText}>SIGN-IN</span>
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

export default EmailModalDialog;
