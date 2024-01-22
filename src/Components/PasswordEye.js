import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import style from "../Styles/PasswordEye.module.css";

const PasswordEyeComponent = ({ showStatus, setShowStatus }) => {
  return (
    <button
      className={style.passIcon}
      type="button"
      onClick={() => setShowStatus((prev) => !prev)}
    >
      {showStatus ? (
        <AiOutlineEyeInvisible className="eye" />
      ) : (
        <AiOutlineEye className="eye" />
      )}
    </button>
  );
};

export default PasswordEyeComponent;
