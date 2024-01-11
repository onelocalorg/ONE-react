import InputComponent from "./InputComponent";
import Style from "../Styles/ReferedBy.module.css";

function ReferedBy({ register, formStyle }) {
  return (
    <div className={Style.referedbyContainer}>
      <div className={formStyle.fieldHeading}>Referred By</div>
      <div>
        <InputComponent
          type={"referedby"}
          placeholder={"Give someone gratis"}
          register={register}
          inputRef={"referedby"}
          name={"referedby"}
          className={formStyle.inputField}
        />
      </div>
    </div>
  );
}

export default ReferedBy;
