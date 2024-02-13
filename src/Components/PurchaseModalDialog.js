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
// import ReferedBy from "./ReferedBy";
import InputComponent from "./InputComponent";
import ToasterSuccess from "./ToasterSuccess";
import ToasterError from "./ToasterComponent";
import { REQUIRED_FIELD_MESSAGE } from "../utils/AppConstants";
import {
  addNewCardAPI,
  appendNewCardAPI,
  submitPurchaseData,
  getCardListAPI,
  userRegistrationWithPayment,
} from "../api/services";
import { useDispatch, useSelector } from "react-redux";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import { setUserData } from "../Redux/slices/UserSlice";

function PurchaseModalDialog({
  hideFunc,
  purchaseTotal,
  showRegister,
  showBillingInformation,
  setShowBillingInformation,
  userEmail,
  activePurchaseStep,
  setloadingFunc,
  ticketFormVal,
  ticketData,
}) {
  const [stripeCardStatus, setStripeCardStatus] = useState({});
  const [addCardAction, setAddCardAction] = useState(false);
  const [cardRequired, setCardRequired] = useState(false);
  const [submitFormType, setSubmitFormType] = useState(null);
  const [cardList, setCardList] = useState([]);
  const userInfo = useSelector((state) => state?.userInfo);
  const navigate = useNavigate();
  const elements = useElements();
  const stripe = useStripe();
  const dispatch = useDispatch();

  const handleClose = () => {
    hideFunc(false);
  };

  const billingValidation = yup.object({
    nameoncard: yup.string().required(REQUIRED_FIELD_MESSAGE),
    // country: yup.string().required(REQUIRED_FIELD_MESSAGE),
    // address1: yup.string().required(REQUIRED_FIELD_MESSAGE),
    // city: yup.string().required(REQUIRED_FIELD_MESSAGE),
    // state: yup.string().required(REQUIRED_FIELD_MESSAGE),
    // zip: yup.string().required(REQUIRED_FIELD_MESSAGE),
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
      // country: yup.string().required(REQUIRED_FIELD_MESSAGE),
      // address1: yup.string().required(REQUIRED_FIELD_MESSAGE),
      // city: yup.string().required(REQUIRED_FIELD_MESSAGE),
      // state: yup.string().required(REQUIRED_FIELD_MESSAGE),
      // zip: yup.string().required(REQUIRED_FIELD_MESSAGE),
      password: yup
        .string()
        .required(REQUIRED_FIELD_MESSAGE)
        .min(8, "password must be at least 8 characters")
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d).+$/,
          "Password must contain at least 1 letter and 1 number"
        ),
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
    watch,
    formState: { errors, isSubmitted },
  } = useForm({
    resolver: yupResolver(currentValidationSchema),
    defaultValues: {
      savedcard: "",
      email: userEmail,
    },
  });

  const formVal = watch();

  const getCardList = async () => {
    setloadingFunc(true);
    const res = await getCardListAPI();

    setloadingFunc(false);
    if (res?.success) {
      setCardList(res?.data?.cards || []);
      reset({ savedcard: res?.data?.default_source || "" }); //Set card value
    } else {
      ToasterError(res?.message || "No card found", 2000);
    }
  };

  useEffect(() => {
    if (userInfo?.userData) {
      getCardList();
    }
  }, []);

  const setUpdatedCardList = (response) => {
    if (response?.success) {
      getCardList();
      setShowBillingInformation(false);
      elements.getElement(CardElement).clear(); //Clear card field
    }
  };

  const addAppendCard = async () => {
    if (cardList.length === 0) {
      const response = await addNewCardAPI({
        token: stripeCardStatus?.token?.id,
      });
      setloadingFunc(false);
      setUpdatedCardList(response);
    } else {
      const response = await appendNewCardAPI({
        token: stripeCardStatus?.token?.id,
      });
      setloadingFunc(false);
      setUpdatedCardList(response);
    }
  };

  const registerNewUser = async (data) => {
    const paymentCard = stripeCardStatus?.token;
    if (paymentCard !== "") {
      const linktoTicketPurchase = ticketData.find(
        (item) => item.price === Number(ticketFormVal.ticket)
      );

      const responseData = await userRegistrationWithPayment({
        email: userEmail,
        password: data?.password,
        cpassword: data?.confirmpassword,
        token: stripeCardStatus?.token?.id,
        ticketId: linktoTicketPurchase?.id,
        quantity: ticketFormVal?.quantity,
        isPaymentLink: true,
        payment_source: stripeCardStatus?.token?.card?.id,
      });

      setloadingFunc(false);

      if (
        responseData?.success &&
        Object.keys(responseData?.data?.userDetail || {}).length
      ) {
        // Data set
        dispatch(
          setUserData({
            profile_image: responseData?.data?.userDetail?.pic,
            userId: responseData?.data?.userDetail?.id,
            ...responseData?.data?.userDetail,
          })
        );
        localStorage.setItem(
          "user_info",
          JSON.stringify({
            profile_image: responseData?.data?.userDetail?.pic || "",
            userId: responseData?.data?.userDetail?.id,
          })
        );
      }

      if (
        responseData?.success &&
        responseData?.data?.paymentSummary &&
        Object.keys(responseData?.data?.paymentSummary || {}).length
      ) {
        ToasterSuccess(responseData?.message || "Success", 1500);

        navigate("/payment-successfull");
      } else if (
        responseData?.success &&
        !Object.keys(responseData?.data?.paymentSummary || {}).length
      ) {
        hideFunc(false);
        ToasterError(responseData?.message || "Something went wrong", 3500);
      } else {
        // hideFunc(false);
        ToasterError(responseData?.message || "Something went wrong", 1500);
      }
    }
  };

  const submitBuyData = async () => {
    const linktoTicketPurchase = ticketData.find(
      (item) => item.price === Number(ticketFormVal.ticket)
    );
    setloadingFunc(true);
    const responseData = await submitPurchaseData(
      linktoTicketPurchase?.id,
      ticketFormVal?.quantity,
      formVal?.savedcard
    );
    setloadingFunc(false);
    if (responseData.success) {
      navigate("/payment-successfull");
    } else {
      hideFunc(false);
      ToasterError(responseData?.message || "Something went wrong", 1500);
    }
  };

  const onSubmit = async (data) => {
    if (submitFormType === "direct" || submitFormType === "add_card") {
      if (showRegister) {
        if (stripeCardStatus?.token) {
          registerNewUser(data);
        }
      } else if (addCardAction) {
        if (stripeCardStatus?.token) {
          setloadingFunc(true);
          addAppendCard();
        }
      } else {
        submitBuyData();
      }
      setSubmitFormType(null);
    }
  };

  useEffect(() => {
    if (submitFormType) {
      handleSubmit(onSubmit)();
    }
  }, [submitFormType]);

  const handleCreateCard = async () => {
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return { error: { success: false } };
    }

    const payloadCreate = await stripe.createToken(
      elements.getElement(CardElement),
      {
        name: formVal?.nameoncard || "",
        address_line1: formVal?.address1 || "",
        address_line2: formVal?.address2 || "",
        address_city: formVal?.city || "",
        address_state: formVal?.state || "",
        address_zip: formVal?.zip || "",
        address_country: formVal?.country || "",
      }
    );
    setStripeCardStatus(payloadCreate);
    return payloadCreate;
  };

  const validateSubmitData = async (itemType) => {
    // Check Form Error
    if (Object.keys(errors).length > 0) {
      setSubmitFormType(null);
      setloadingFunc(false);
      return;
    }

    // Card token create for direct register
    setloadingFunc(true);
    const createCardResponse = await handleCreateCard();

    // Check card Error
    if (
      createCardResponse?.error &&
      Object.keys(createCardResponse?.error).length > 0
    ) {
      setSubmitFormType(null);
      setloadingFunc(false);
    } else {
      setloadingFunc(true);
      setSubmitFormType(itemType);
    }
  };

  const handleSubmitDirect = async () => {
    setSubmitFormType("other"); //Just for trigger submit for validation show

    setAddCardAction(false);
    setCardRequired(true);
    if (!showRegister) {
      setCardRequired(false);
      setShowBillingInformation(false);
      elements.getElement(CardElement).clear(); //Clear card field
      setSubmitFormType("direct");
    } else {
      validateSubmitData("direct");
    }
  };

  const handleSubmitCardDetail = async () => {
    setSubmitFormType("other"); //Just for trigger submit for validation show
    setCardRequired(true);
    setAddCardAction(true);
    setShowBillingInformation(true);
    validateSubmitData("add_card");
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
                    disabled={true}
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
              setloadingFunc={setloadingFunc}
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
                {/* <ReferedBy register={register} formStyle={Style} /> */}
              </>
            )}
          </form>
        </Modal.Body>
        <Modal.Footer className={Style.purchaseFooter}>
          <button
            className={Style.purchaseformButton}
            onClick={handleSubmitDirect}
            disabled={!cardList.length && !showRegister}
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
