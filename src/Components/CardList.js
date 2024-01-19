import { useEffect, useState } from "react";
import Style from "../Styles/CardList.module.css";
import AddIcon from "../images/add-icon.svg";
import InputComponent from "./InputComponent";

function CardList({ register, handleSubmitCardDetail, cardData }) {
  return (
    <div className={Style.cardListContainer}>
      <div className={Style.addIcon}>
        <div className={Style.imgContainer}>
          <img src={AddIcon} alt="Add" onClick={handleSubmitCardDetail} />
        </div>
      </div>
      <div className={Style.cardList}>
        {cardData.map((card) => (
          <div className={Style.cardListItem} key={card?.id}>
            <div>
              <div className={Style.inputSelect}>
                <InputComponent
                  type={"radio"}
                  register={register}
                  inputRef={"savedcard"}
                  name={"savedcard"}
                  id={card?.id}
                  value={card?.id}
                  style={{ height: "18px" }}
                />

                <label htmlFor={card?.id} className={Style.inputLabel}>
                  {`${card?.brand} - ${card?.last4}`}
                </label>
              </div>
            </div>
            <div>
              <span className={Style.cardExpiredLbl}>
                exp{" "}
                {card?.exp_month < 10 ? `0${card?.exp_month}` : card?.exp_month}
                /{card?.exp_year.toString().substr(-2)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CardList;
