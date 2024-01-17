import InputComponent from "./InputComponent";
import Style from "../Styles/BillingAddress.module.css";

function BillingAddress({ register, errors, formStyle }) {
  return (
    <div className={Style.billingContainer}>
      <div className={formStyle.fieldHeading}>Billing address *</div>
      <div>
        <InputComponent
          type={"text"}
          placeholder={"Country or Region"}
          register={register}
          inputRef={"country"}
          name={"country"}
          className={formStyle.inputField}
        />
        {errors.country && errors.country.type === "required" && (
          <div role="alert" className={formStyle.error}>
            {errors?.country?.message}
          </div>
        )}
      </div>
      <div>
        <InputComponent
          type={"text"}
          placeholder={"Address line 1"}
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
      <div>
        <InputComponent
          type={"text"}
          placeholder={"Address line 2 (optional)"}
          register={register}
          inputRef={"address2"}
          name={"address2"}
          className={formStyle.inputField}
        />
      </div>
      <div>
        <InputComponent
          type={"text"}
          placeholder={"City"}
          register={register}
          inputRef={"city"}
          name={"city"}
          className={formStyle.inputField}
        />
        {errors.city && errors.city.type === "required" && (
          <div role="alert" className={formStyle.error}>
            {errors?.city?.message}
          </div>
        )}
      </div>
      <div>
        <InputComponent
          type={"text"}
          placeholder={"State"}
          register={register}
          inputRef={"state"}
          name={"state"}
          className={formStyle.inputField}
        />
        {errors.state && errors.state.type === "required" && (
          <div role="alert" className={formStyle.error}>
            {errors?.state?.message}
          </div>
        )}
      </div>
      <div>
        <InputComponent
          type={"text"}
          placeholder={"ZIP"}
          register={register}
          inputRef={"zip"}
          name={"zip"}
          className={formStyle.inputField}
        />
        {errors.zip && errors.zip.type === "required" && (
          <div role="alert" className={formStyle.error}>
            {errors?.zip?.message}
          </div>
        )}
      </div>
    </div>
  );
}

export default BillingAddress;
