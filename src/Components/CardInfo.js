import InputComponent from "./InputComponent";
import Style from "../Styles/CardInfo.module.css";
import StripeCardElement from "./StripeCardElement";

function CardInfo({
  register,
  errors,
  formStyle,
  showBillingInformation,
  showBillingFunc,
  stripeCardStatus,
  setStripeCardStatus,
  isSubmitted,
  cardRequired,
}) {
  return (
    <div className={Style.billingContainer}>
      {showBillingInformation && (
        <>
          <div className={formStyle.fieldHeading}>Card Info *</div>

          <div>
            <InputComponent
              type={"text"}
              placeholder={"Name on card"}
              register={register}
              inputRef={"nameoncard"}
              name={"nameoncard"}
              className={formStyle.inputField}
            />
            {errors.nameoncard && errors.nameoncard.type === "required" && (
              <div role="alert" className={formStyle.error}>
                {errors?.nameoncard?.message}
              </div>
            )}
          </div>
        </>
      )}
      <div>
        <StripeCardElement
          showBillingFunc={showBillingFunc}
          stripeCardStatus={stripeCardStatus}
          setStripeCardStatus={setStripeCardStatus}
          isSubmitted={isSubmitted}
          cardRequired={cardRequired}
        />
      </div>
    </div>
  );
}

export default CardInfo;
