import InputComponent from "./InputComponent";
import Style from "../Styles/CreatePassword.module.css";

function CreatePassword({ register, errors, formStyle }) {
  return (
    <div className={Style.passwordContainer}>
      <div className={formStyle.fieldHeading}>Create a password *</div>
      <div>
        <InputComponent
          type={"password"}
          placeholder={"Password"}
          register={register}
          inputRef={"password"}
          name={"password"}
          className={formStyle.inputField}
        />
        {errors.password && errors.password.type === "required" && (
          <div role="alert" className={formStyle.error}>
            {errors?.password?.message}
          </div>
        )}
      </div>
      <div>
        <InputComponent
          type={"confirmpassword"}
          placeholder={"Confirm Password"}
          register={register}
          inputRef={"confirmpassword"}
          name={"confirmpassword"}
          className={formStyle.inputField}
        />
        {errors.confirmpassword &&
          errors.confirmpassword.type === "required" && (
            <div role="alert" className={formStyle.error}>
              {errors?.confirmpassword?.message}
            </div>
          )}
      </div>
    </div>
  );
}

export default CreatePassword;
