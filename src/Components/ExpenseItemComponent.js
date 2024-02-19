import React from "react";
import payoutProfileIcon from "../images/payout-profile.png";
import Style from "../Styles/MyEventPage.module.css";

function ExpenseItemComponent({ title, subTitle1, subTitle2, itemAmt }) {
  return (
    <>
      <div className={Style.expenseItem}>
        <div className={Style.expenseItemLeft}>
          <div className={Style.profileIcon}>
            <img src={payoutProfileIcon} className={Style.expenseItemImg} />
          </div>
          <div>
            <div className={Style.expenseItemTitle}>{title}</div>
            <div className={Style.expenseItemSubTitle}>
              {subTitle1}
              <br />
              {subTitle2}
            </div>
          </div>
        </div>
        <div>{itemAmt ? `$${itemAmt}` : ""}</div>
      </div>
    </>
  );
}

export default ExpenseItemComponent;
