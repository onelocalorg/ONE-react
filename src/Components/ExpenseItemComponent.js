import React from "react";
import Style from "../Styles/MyEventPage.module.css";
import EditIcon from "../images/Edit icon.svg";

function ExpenseItemComponent({
  title,
  subTitle1,
  itemAmt,
  payoutProfileIcon,
  pricetype,
  openEditModal,
  showEditIcon,
}) {
  return (
    <>
      <div className={Style.expenseItem}>
        <div className={Style.expenseItemLeft}>
          <div className={Style.profileIcon}>
            {showEditIcon && (
              <img
                src={EditIcon}
                alt="edit"
                className={Style.editIcon}
                style={{
                  marginRight: "3px",
                  transform: "scale(0.85",
                  cursor: "pointer",
                }}
                onClick={openEditModal}
              />
            )}
            <img src={payoutProfileIcon} className={Style.expenseItemImg} />
          </div>
          <div>
            <div className={Style.expenseItemTitle}>{title}</div>
            <div className={Style.expenseItemSubTitle}>{subTitle1}</div>
          </div>
        </div>
        <div>{pricetype === "price" ? `$${itemAmt}` : `${itemAmt}%`}</div>
      </div>
    </>
  );
}

export default ExpenseItemComponent;
