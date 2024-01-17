import { useEffect, useState } from "react";
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
import ToasterSuccess from "./ToasterSuccess";
import { REQUIRED_FIELD_MESSAGE } from "../utils/FieldLabels";
import { getCardListAPI } from "../api/services";

function PurchaseModalDialog({
  hideFunc,
  purchaseTotal,
  showRegister,
  showBillingInformation,
  setShowBillingInformation,
  userEmail,
  activePurchaseStep,
  setloadingFunc,
}) {
  const [stripeCardStatus, setStripeCardStatus] = useState({});
  const [addCardAction, setAddCardAction] = useState(false);
  const [cardRequired, setCardRequired] = useState(false);
  const [submitFormType, setSubmitFormType] = useState(null);
  const [cardList, setCardList] = useState([]);

  const handleClose = () => {
    hideFunc(false);
  };

  const billingValidation = yup.object({
    nameoncard: yup.string().required(REQUIRED_FIELD_MESSAGE),
    country: yup.string().required(REQUIRED_FIELD_MESSAGE),
    address1: yup.string().required(REQUIRED_FIELD_MESSAGE),
    city: yup.string().required(REQUIRED_FIELD_MESSAGE),
    state: yup.string().required(REQUIRED_FIELD_MESSAGE),
    zip: yup.string().required(REQUIRED_FIELD_MESSAGE),
  });

  const loggedInValidation = showBillingInformation
    ? billingValidation
    : yup.object({});

  const validationSchema = [
    yup.object({
      email: yup
        .string()
        .required(REQUIRED_FIELD_MESSAGE)
        .email("Invalid Email"),
      nameoncard: yup.string().required(REQUIRED_FIELD_MESSAGE),
      country: yup.string().required(REQUIRED_FIELD_MESSAGE),
      address1: yup.string().required(REQUIRED_FIELD_MESSAGE),
      city: yup.string().required(REQUIRED_FIELD_MESSAGE),
      state: yup.string().required(REQUIRED_FIELD_MESSAGE),
      zip: yup.string().required(REQUIRED_FIELD_MESSAGE),
      password: yup.string().required(REQUIRED_FIELD_MESSAGE),
      confirmpassword: yup
        .string()
        .required(REQUIRED_FIELD_MESSAGE)
        .oneOf([yup.ref("password")], "Password do not match"),
    }),
    loggedInValidation,
  ];

  const currentValidationSchema = validationSchema[activePurchaseStep];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitted },
  } = useForm({
    resolver: yupResolver(currentValidationSchema),
    defaultValues: {
      savedcard: "",
      email: userEmail,
    },
  });

  useEffect(() => {
    async function getCardList() {
      setloadingFunc(true);
      const res = await getCardListAPI();
      setloadingFunc(false);
      setCardList(res?.data?.cards || []);
      reset({ savedcard: res?.data?.default_source || "" }); //Set card value
    }
    getCardList();
  }, []);

  const onSubmit = async (data) => {
    if (showRegister) {
      if (!stripeCardStatus?.error) {
        const paymentMethodID = stripeCardStatus?.paymentMethod?.id || "";
        if (paymentMethodID !== "") {
          setloadingFunc(true); // Start loading
          data["paymentMethodID"] = stripeCardStatus?.paymentMethod?.id || "";
          // console.log(data);
          console.log(data);
          setTimeout(() => {
            setloadingFunc(false);
            handleClose();
            ToasterSuccess("Purchased Successfully", 1500);
          }, 1500);
        }
      }
    } else {
      if (addCardAction) {
        console.log("Add Card Call");
      } else {
        console.log("Normal Call");
      }
    }
  };

  useEffect(() => {
    if (submitFormType) {
      handleSubmit(onSubmit)();
    }
  }, [submitFormType]);

  const handleSubmitDirect = () => {
    setSubmitFormType("direct");
    setAddCardAction(false);
    setCardRequired(true);
    if (!showRegister) {
      setCardRequired(false);
    }
  };

  const handleSubmitCardDetail = () => {
    setSubmitFormType("add_card");
    setCardRequired(true);
    setAddCardAction(true);
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
              stripeCardStatus={stripeCardStatus}
              setStripeCardStatus={setStripeCardStatus}
              isSubmitted={isSubmitted}
              cardRequired={cardRequired}
            />
            {showBillingInformation && (
              <BillingAddress
                register={register}
                errors={errors}
                formStyle={Style}
              />
            )}
            {!showRegister && (
              <CardList
                register={register}
                errors={errors}
                handleSubmitCardDetail={handleSubmitCardDetail}
                cardData={cardList}
              />
            )}
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
            onClick={handleSubmitDirect}
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
            <div className={Style.termsSection}>
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
