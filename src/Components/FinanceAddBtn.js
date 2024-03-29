import React from "react";
import plusIcon from "../images/plus-icon.png";
import Style from "../Styles/MyEventPage.module.css";

function FinanceAddBtn({ addAction }) {
  return (
    <>
      <div className={Style.BtnContainer}>
        <button
          className={Style.addExpenseBtn}
          onClick={addAction}
          type="button"
        >
          <img src={plusIcon} alt="plus" />
          <span className={Style.addItemBtnText}>Add Item</span>
        </button>
      </div>
    </>
  );
}

export default FinanceAddBtn;
