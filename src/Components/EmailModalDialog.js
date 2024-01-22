import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputComponent from "./InputComponent";
import Style from "../Styles/DialogForm.module.css";
import nextarrow from "../images/next-arrow.svg";
import closeIcon from "../images/close-icon.svg";
import { getUserByEmail, loginWithEmailApi } from "../api/services";
import ToasterSuccess from "./ToasterSuccess";
import ToasterError from "./ToasterComponent";
import { setUserData } from "../Redux/slices/UserSlice";
import { useDispatch } from "react-redux";
import { REQUIRED_FIELD_MESSAGE } from "../utils/AppConstants";

function EmailModalDialog({
  hideFunc,
  purchaseFunc,
  setloadingFunc,
  setShowRegister,
  setShowBillingInformation,
  setUserEmail,
  setActivePurchaseStep,
}) {
  const [activeStep, setActiveStep] = useState(0);
  const dispatch = useDispatch();

  const handleClose = () => {
    hideFunc(false);
  };

  const validationSchema = [
    yup.object({
      email: yup
        .string()
        .required(REQUIRED_FIELD_MESSAGE)
        .email("Invalid Email"),
    }),
    yup.object({
      email: yup
        .string()
        .required(REQUIRED_FIELD_MESSAGE)
        .email("Invalid Email"),
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
    const response = await loginWithEmailApi(data);
    setloadingFunc(false);
    if (response?.success) {
      dispatch(setUserData({ profile_image: response?.data?.pic }));
      localStorage.setItem(
        "user_info",
        JSON.stringify({
          profile_image: response?.data?.pic || "",
        })
      );
      purchaseFunc(true);
      handleClose();
    } else {
      ToasterError(response?.message || "Invalid password", 3000);
    }
  };

  const handleNext = async () => {
    const formValues = getValues();
    const isStepValid = await trigger();

    if (isStepValid) {
      setloadingFunc(true);
      setUserEmail(formValues?.email);
      const response = await getUserByEmail(formValues?.email);

      setloadingFunc(false);
      if (response?.data?.exists) {
        setActivePurchaseStep(1); //For Already avaiable user
        setShowRegister(false);
        setShowBillingInformation(false);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      } else {
        setShowRegister(true);
        purchaseFunc(true);
        setShowBillingInformation(true);
        handleClose();
        ToasterError(response?.message || "Something went wrong", 3000);
      }
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (activeStep === 0) {
      handleNext();
    } else if (activeStep === 1) {
      handleSubmit(onSubmit)();
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
          <form onSubmit={handleFormSubmit}>
            <div>
              <InputComponent
                type={"text"}
                placeholder={"Email"}
                register={register}
                inputRef={"email"}
                name={"email"}
                className={Style.inputField}
                disabled={activeStep === 1}
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
                {errors.password &&
                  (errors.password.type === "required" ||
                    errors.password.type === "min" ||
                    errors.password.type === "matches") && (
                    <div role="alert" className={Style.error}>
                      {errors?.password?.message}
                    </div>
                  )}
              </div>
            )}
            <button type="submit" style={{ display: "none" }}>
              Submit
            </button>
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
