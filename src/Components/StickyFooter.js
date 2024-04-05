import React, { useCallback, useState, useEffect } from "react";
import Style from "../Styles/stickyFooter.module.css";
import Plus from "../images/plus.svg";
import ModalComponent from "./ModalCompnent";
import Event from "../images/event.svg";
import Offer from "../images/OfferBlack.svg";
import Request from "../images/Request.svg";
import Graits from "../images/Graits.svg";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import EventSvgr from "./SVGR/Event";
import ProducerMember from "./producerMembership";
import {
  subscriptionsPlansApi,
  packageListApi,
  memberShipCheckoutAPI,
} from "../api/services";
import Loader from "./Loader";
import ToasterComponent from "./ToasterComponent";

function findObjectByKey(array, key, value) {
  return array.find((obj) => obj[key] === value);
}

function StickyFooter() {
  const [showModal, setShowModal] = useState(false);
  const [EventProduce, setEventProduce] = useState(false);
  const [isProduceMemberShip, setProduceSetUpMemberShip] = useState(false);
  const [checkoutDetail, setCheckoutDetail] = useState(false);
  const [select, setSelectData] = useState({});
  const isCreateEventEnabled = useSelector(
    (state) => state?.showTicketCheckins?.isCreateEventEnabled
  );

  const state = useSelector((state) => state);
  const [isLoading, setIsLoading] = useState(false);
  const [details, setAllDetails] = useState(null);

  const navigate = useNavigate();

  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  const callPackageListAPi = async () => {
    setIsLoading(true);
    try {
      const response = await packageListApi();
      const { data } = response.data;
      const result = findObjectByKey(data, "key", "event_producer");
      setSelectData(result);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMemberShipDetail = async (id) => {
    try {
      setIsLoading(true);
      const res = await memberShipCheckoutAPI(id);
      const { data } = res.data;
      setAllDetails(data);
      setCheckoutDetail(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const OnEventBtnClick = () => {
    if (state.userInfo.userData) {
      if (isCreateEventEnabled) {
        navigate("/create-event");
        setShowModal(false);
      } else {
        callPackageListAPi();
        setShowModal(false);
        setEventProduce(true);
      }
    } else {
      ToasterComponent("Login is required to createEvent", 2000);
    }
  };

  const closeBtn = () => {
    setEventProduce(false);
  };

  const onClickSignUpProducer = () => {
    loadMemberShipDetail(select.id);
    setEventProduce(false);
    setProduceSetUpMemberShip(true);
  };

  const onClickCancelProducer = () => {
    // loadMemberShipDetail(select.id);
    // setProduceSetUpMemberShip(false);
    setEventProduce(false);
  };

  const closeProduceSetUpMemberShip = () => {
    setProduceSetUpMemberShip(false);
  };

  return (
    <>
      <div className={Style.stickyFooter}>
        <span className={Style.fonts} onClick={openModal}>
          <img src={Plus} className={Style.img} />
        </span>
      </div>
      <ModalComponent
        hideFunc={closeModal}
        show={showModal}
        wrapperClassname={` ${Style.wModal}`}
        isHeaderHight
        body={
          <div style={{ display: "flex", gap: 10, flexDirection: "column" }}>
            <div className={Style.subContainer} onClick={OnEventBtnClick}>
              <span className={Style.greenBorder}>
                <img src={Event} className={Style.ModalImg} />
                <span>Event</span>
              </span>
            </div>
            <div className={Style.subContainer}>
              <span className={Style.greenBorder}>
                <img src={Offer} className={Style.ModalImg} />
                <span>Offer</span>
              </span>
              <span className={Style.greenBorder}>
                <img src={Request} className={Style.ModalImg} />
                <span>Request</span>
              </span>
              <span className={Style.greenBorder}>
                <img src={Graits} className={Style.ModalImg} />
                <span>Graits</span>
              </span>
            </div>
          </div>
        }
      />
      <ModalComponent
        hideFunc={closeBtn}
        show={EventProduce}
        wrapperClassname={` ${Style.wModal}`}
        isHeaderHight
        body={
          <div className={Style.ModalContainer}>
            <div className={Style.eventProducerContainer}>
              <EventSvgr width="40px" height="40px" fill="#fff" />
              Event Producer
            </div>
            <span className={Style.textContainer}>{select.description}</span>

            {select.status && (
              <span className={Style.textContainerDefaultText}>
                {select.defaultSignupText}
              </span>
            )}
            {!select.status && (
              <div className={Style.signup} onClick={onClickSignUpProducer}>
                Sign Up!
              </div>
            )}
            {select.status && (
              <div className={Style.signup} onClick={onClickCancelProducer}>
                Cancel Subscription
              </div>
            )}
          </div>
        }
      />

      {checkoutDetail && (
        <ProducerMember
          details={details}
          shouldShowProduceModal={isProduceMemberShip}
          checkoutDetail={checkoutDetail}
          id={select?.id}
          loadMemberShipDetail={loadMemberShipDetail}
          setProduceSetUpMemberShip={(bool) => {
            setProduceSetUpMemberShip(bool);
          }}
        />
      )}

      {isLoading && <Loader />}
    </>
  );
}

export default StickyFooter;
