import InputComponent from "./InputComponent";
import Style from "../Styles/CardInfo.module.css";

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
        <InputComponent
          type={"text"}
          placeholder={"Card Number"}
          register={register}
          inputRef={"address1"}
          name={"address1"}
          className={formStyle.inputField}
        />
        {errors.address1 && errors.address1.type === "required" && (
          <div role="alert" className={formStyle.error}>
            {errors?.address1?.message}
          </div>
        )}
      </div>
    </div>
  );
}

export default CardInfo;
