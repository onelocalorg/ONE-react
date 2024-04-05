import React, { useState, useEffect } from "react";
import Style from "../Styles/ProducerMembership.module.css";
import ModalComponent from "./ModalCompnent";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import EventSvgr from "./SVGR/Event";
import Start from "./SVGR/star";
import RightArrow from "../Components/SVGR/RightArrow";
import Card from "./SVGR/Card";
import { subscriptionsPlansApi, packageListApi } from "../api/services";
import arrow from "../images/Shape.svg";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { setCreateEventEnabled } from "../Redux/slices/TicketCheckinsSlice";
import { setUserData } from "../Redux/slices/UserSlice";
import {
  configList,
  cardStripeAPI,
  addNewCardAPI,
  purchaseSubscription,
  getUserDetails,
} from "../api/services";
import Loader from "./Loader";
import ToasterSuccess from "./ToasterSuccess";
import ToasterComponent from "./ToasterComponent";
import { useDispatch } from "react-redux";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

function findObjectByKey(array, key, value) {
  return array.find((obj) => obj[key] === value);
}

function convertDecimalToPrice(num) {
  // Check if the number is not a decimal or is zero
  if (Number.isInteger(num) || num === 0) {
    return num; // Return the original number if it's an integer or zero
  } else {
    return Math.floor(num * 100) / 100; // Convert to two decimal places for prices
  }
}

const addSlashToCardDate = (cardDate) => {
  // Using a regular expression to check and insert "/" after the first two digits if not already present
  return cardDate.replace(/^(\d{2})(?!\/)(\d{0,2})$/, "$1/$2");
};

function ProducerMember({
  shouldShowProduceModal,
  checkoutDetail,
  loadMemberShipDetail,
  setProduceSetUpMemberShip,
  id,
  details,
}) {
  const [select, setSelect] = useState(checkoutDetail.plans[0].id);
  const [EventProduce, setEventProduce] = useState(shouldShowProduceModal);
  const [activePurchaseStep, setActivePurchaseStep] = useState(0);
  const isCreateEventEnabled = useSelector(
    (state) => state?.showTicketCheckins?.isCreateEventEnabled
  );
  const userInfo = useSelector((state) => state?.userInfo);

  const [cardnumber, cardNumberData] = useState("");
  const [cardExpmonth, cardExpMonth] = useState("");
  const [cardExpyear, cardExpYears] = useState("");
  const [date, setDate] = useState("");
  const [cardCvv, cardCVVData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [purchaseDialog, setPurchanseDialog] = useState(false);
  const formVal = null;
  const ticketData = [];
  const dispatch = useDispatch();

  const getConfigList = async () => {
    setIsLoading(true);
    const res = await configList();
    const keyId = res.data.stripe.stripePublicKey;

    const getStripeApiToken = await cardStripeAPI(
      keyId,
      cardnumber,
      cardExpmonth,
      cardExpyear,
      cardCvv
    );

    const card_tok = getStripeApiToken.id;
    if (card_tok) {
      const newCardAddRes = await addNewCardAPI({ token: card_tok });
      await loadMemberShipDetail(id);
      cardNumberData("");
      cardExpMonth("");
      cardExpYears("");
      cardCVVData("");
      setDate("");
      setIsLoading(false);
      closeAddCardModal();
      ToasterSuccess(`Card added successfully`, 2000);
    } else {
      ToasterComponent(getStripeApiToken.error.message, 2000);
      setIsLoading(false);
    }
  };
  const navigate = useNavigate();

  // const openModal = () => {
  //   setShowModal(true);
  //   onClose();
  // };
  // const closeModal = () => {
  //   setShowModal(false);
  // };

  const closeAddCardModal = () => {
    setProduceSetUpMemberShip(true);
    setPurchanseDialog(false);
  };

  const onClose = () => {
    setProduceSetUpMemberShip(false);
  };

  // const closeBtn = () => {
  //   setEventProduce(false);
  // };

  const addCard = () => {
    setPurchanseDialog(true);
    setProduceSetUpMemberShip(false);
    // setShowModal(false);
  };

  const addCardOnClickBtn = async () => {
    await getConfigList();
  };

  // if (userInfo?.userData?.userId) {
  async function getUserData() {
    setIsLoading(true);
    const userResponseData = await getUserDetails(userInfo?.userData?.userId);

    // Data set
    if (userResponseData?.data) {
      dispatch(
        setUserData({
          profile_image: userResponseData?.data?.pic,
          userId: userResponseData?.data?.id,
          ...userResponseData?.data,
        })
      );
      localStorage.setItem(
        "user_info",
        JSON.stringify({
          profile_image: userResponseData?.data?.pic || "",
          userId: userResponseData?.data?.id,
        })
      );
      setIsLoading(false);
    }
  }

  // }

  const purchase = async () => {
    setIsLoading(true);
    if (Object.keys(details.card).length !== 0) {
      const obj = findObjectByKey(details.plans, "id", select);

      const data = {};

      data.plan_id = obj.plan_id;
      data.price_id = obj.price_id;

      if (obj.name === "Billed Monthly") {
        data.totalUnitsMonthly =
          details.customerBill.billSummaryMonthly.totalUnitsMonthly;
      } else {
        data.totalUnitsMonthly =
          details.customerBill.billSummaryYearly.totalUnitsYearly;
      }
      try {
        const onpurchaseSelect = await purchaseSubscription(id, data);
        if (onpurchaseSelect.success) {
          ToasterSuccess(onpurchaseSelect.message, 2000);
          dispatch(setCreateEventEnabled(true));
          setProduceSetUpMemberShip(false);
          getUserData();
          // window.location.reload();
        } else {
          setIsLoading(true);
          ToasterComponent("something went wrong", 2000);
        }
      } catch (error) {
        ToasterComponent("something went wrong", 2000);
      }
    } else {
      ToasterComponent("Please add Card", 2000);
    }

    setIsLoading(false);
  };

  const hideFun = () => {};
  return (
    <>
      {
        <ModalComponent
          hideFunc={onClose}
          show={shouldShowProduceModal}
          wrapperClassname={` ${Style.wModal}`}
          isHeaderHight
          body={
            <div className={Style.container}>
              <div className={Style.memberTitle}>Membership Checkout</div>
              <div className={Style.producerSelection}>
                <Start />
                <h2 className={Style.producerText}>Event Producer </h2>
              </div>

              <div className={Style.priceConatiner}>
                {checkoutDetail &&
                  checkoutDetail.plans.map((e) => {
                    return (
                      <span
                        onClick={() => {
                          setSelect(e.id);
                        }}
                        key={e.id}
                        className={` ${
                          select == e.id
                            ? Style.greenBorder
                            : Style.withoutBorder
                        }`}
                      >
                        <span className={Style.numberDecimal}>
                          ${convertDecimalToPrice(e.price.$numberDecimal)}
                        </span>
                        {e.name}
                      </span>
                    );
                  })}
              </div>

              <p className={Style.paragraph}>{checkoutDetail.description}</p>

              {Object.keys(checkoutDetail.card).length !== 0 && (
                <div className={Style.payment}>
                  <h3>Payment Information</h3>

                  <div className={Style.paymentRaw}>
                    {checkoutDetail.card.brand}.{checkoutDetail.card.last4}
                  </div>
                  <div className={Style.paymentRaw}>
                    exp. {checkoutDetail.card.exp_month}/
                    {checkoutDetail.card.exp_year}
                  </div>
                </div>
              )}

              <button className={Style.addbtn} onClick={addCard}>
                + Add Card
              </button>
              <button className={Style.memberShipBtn} onClick={purchase}>
                <span className={Style.purchaseTxt}>Purchase</span>

                <span className={Style.bgCircle}>
                  <img src={arrow} alt="arrow" className={Style.img} />
                </span>
              </button>
            </div>
          }
        />
      }

      <ModalComponent
        show={purchaseDialog}
        hideFunc={closeAddCardModal}
        isHeaderHight={true}
        header={<div style={{ textAlign: "center" }}>Add Card</div>}
        body={
          <>
            <label>Card Info</label>
            <div>
              <div
                style={{
                  display: "flex",
                  backgroundColor: "#cbcaca",
                  borderRadius: "8px",
                  padding: "10px",
                  alignItems: "center",
                }}
              >
                <Card width={70} />
                <input
                  type="number"
                  placeholder={"Card Number"}
                  className={Style.inputFeild}
                  value={cardnumber}
                  onChange={(event) => {
                    if (event.target.value.length < 20) {
                      cardNumberData(event.target.value);
                    }
                  }}
                ></input>
                <input
                  type={"text"}
                  placeholder={"MM / YY"}
                  className={Style.inputFeild}
                  onChange={(text) => {
                    if (text.target.value.length < 6) {
                      if (text.target.value.length > 2) {
                        const newText = addSlashToCardDate(text.target.value);
                        setDate(newText);
                        const [month, year] = newText.split("/");
                        cardExpMonth(month);
                        cardExpYears(year);
                      } else {
                        setDate(text.target.value);
                      }
                    }
                  }}
                  value={date}
                ></input>

                <input
                  type="number"
                  placeholder={"CVV"}
                  className={`${Style.inputFeild} ${Style.cvv}`}
                  onChange={(event) => {
                    if (event.target.value.length < 4) {
                      cardCVVData(event.target.value);
                    }
                  }}
                  value={cardCvv}
                ></input>
              </div>
            </div>
            <button className={Style.addCard} onClick={addCardOnClickBtn}>
              <div className={Style.addText}>Add Card</div>
              <div className={Style.alightRight}>
                <RightArrow />
              </div>
            </button>
          </>
        }
      ></ModalComponent>

      {isLoading && <Loader />}
    </>
  );
}

export default ProducerMember;
