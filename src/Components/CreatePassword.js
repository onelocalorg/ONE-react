import InputComponent from "./InputComponent";
import Style from "../Styles/CreatePassword.module.css";
import PasswordEyeComponent from "./PasswordEye";
import { useState } from "react";

function CreatePassword({ register, errors, formStyle }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);

  return (
    <div className={Style.passwordContainer}>
      <div className={formStyle.fieldHeading}>Create a password *</div>
      <div>
        <div className={Style.inputDiv}>
          <InputComponent
            type={showPassword ? "text" : "password"}
            placeholder={"Password"}
            register={register}
            inputRef={"password"}
            name={"password"}
            className={formStyle.inputField}
          />
          <PasswordEyeComponent
            showStatus={showPassword}
            setShowStatus={setShowPassword}
          />
        </div>
        {errors.password &&
          (errors.password.type === "required" ||
            errors.password.type === "min" ||
            errors.password.type === "matches") && (
            <div role="alert" className={formStyle.error}>
              {errors?.password?.message}
            </div>
          )}
      </div>
      <div>
        <div className={Style.inputDiv}>
          <InputComponent
            type={showCPassword ? "text" : "password"}
            placeholder={"Confirm Password"}
            register={register}
            inputRef={"confirmpassword"}
            name={"confirmpassword"}
            className={formStyle.inputField}
          />
          <PasswordEyeComponent
            showStatus={showCPassword}
            setShowStatus={setShowCPassword}
          />
        </div>
        {errors.confirmpassword &&
          (errors.confirmpassword.type === "required" ||
            errors.confirmpassword.type === "oneOf") && (
            <div role="alert" className={formStyle.error}>
              {errors?.confirmpassword?.message}
            </div>
          )}
      </div>
    </div>
  );
}

export default CreatePassword;
