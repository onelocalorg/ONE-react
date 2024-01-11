import InputComponent from "./InputComponent";
import Style from "../Styles/CardInfo.module.css";
import StripeCardElement from "./StripeCardElement";

function CardInfo({ register, errors, formStyle }) {
  return (
    <div className={Style.billingContainer}>
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
      <div>
        <StripeCardElement />
      </div>
    </div>
  );
}

export default CardInfo;
