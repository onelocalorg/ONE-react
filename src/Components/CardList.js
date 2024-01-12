import Style from "../Styles/CardList.module.css";
import AddIcon from "../images/add-icon.svg";
import InputComponent from "./InputComponent";
function CardList({ register }) {
  return (
    <div className={Style.cardListContainer}>
      <div className={Style.addIcon}>
        <div className={Style.imgContainer}>
          <img src={AddIcon} alt="Add" />
        </div>
      </div>
      <div className={Style.cardList}>
        <div className={Style.cardListItem}>
          <div>
            <div>
              <InputComponent
                type={"radio"}
                register={register}
                inputRef={"savedcard"}
                name={"savedcard"}
                // id={ticketitem.id}
                id="html"
                value={"33"}
                style={{ height: "18px" }}
              />

              <label htmlFor="html" className={Style.inputLabel}>
                Visa - 0127
              </label>
            </div>
          </div>
          <div>exp 04/24</div>
        </div>
        <div className={Style.cardListItem}>
          <div>
            <div>
              <InputComponent
                type={"radio"}
                register={register}
                inputRef={"savedcard"}
                name={"savedcard"}
                // id={ticketitem.id}
                id="html1"
                value="11"
                style={{ height: "18px" }}
              />

              <label htmlFor="html1" className={Style.inputLabel}>
                Visa - 0127
              </label>
            </div>
          </div>
          <div>exp 04/24</div>
        </div>
        <div className={Style.cardListItem}>
          <div>
            <div>
              <InputComponent
                type={"radio"}
                register={register}
                inputRef={"savedcard"}
                name={"savedcard"}
                // id={ticketitem.id}
                id="html2"
                value="22"
                style={{ height: "18px" }}
              />

              <label htmlFor="html2" className={Style.inputLabel}>
                Visa - 0127
              </label>
            </div>
          </div>
          <div>exp 04/24</div>
        </div>
      </div>
    </div>
  );
}

export default CardList;
