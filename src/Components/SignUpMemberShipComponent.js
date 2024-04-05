import React, { useState } from "react";
import EventSvgr from "./SVGR/Event";
import Player from "./SVGR/PlayerPopup";
import ProducerMember from "./producerMembership";
import {
  subscriptionsPlansApi,
  packageListApi,
  memberShipCheckoutAPI,
  cancelSubscription,
} from "../api/services";
import ModalComponent from "./ModalCompnent";
import Style from "../Styles/stickyFooter.module.css";
import Loader from "./Loader";
import ToasterSuccess from "./ToasterSuccess";
import ToasterComponent from "./ToasterComponent";

function SignUpMemberShipComponent({
  setEventProduce,
  select,
  setProduceSetUpMemberShip,
  EventProduce,
  isProduceMemberShip,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [details, setAllDetails] = useState(null);
  const [checkoutDetail, setCheckoutDetail] = useState(false);
  const closeBtn = () => {
    setEventProduce(false);
  };

  const onClickSignUpProducer = () => {
    loadMemberShipDetail(select.id);
    setEventProduce(false);
    setProduceSetUpMemberShip(true);
  };

  const onClickCancelProducer = async () => {
    // loadMemberShipDetail(select.id);
    // setProduceSetUpMemberShip(false);
    // select.id
    setIsLoading(true);
    try {
      const res = await cancelSubscription(select.id, {
        plan_id: select.current_plan_id,
      });
      if (res.success) {
        ToasterSuccess(`${res.message}`, 2000);
      } else {
        ToasterComponent(`${res.message}`, 2000);
      }
      setIsLoading(false);
    } catch (error) {
      ToasterComponent(`${error}`, 2000);
    }

    // console.log("select", select.current_plan_id);
    // setEventProduce(false);
  };

  const closeProduceSetUpMemberShip = () => {
    setProduceSetUpMemberShip(false);
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

  console.log("select", select);
  return (
    <>
      <ModalComponent
        hideFunc={closeBtn}
        show={EventProduce}
        wrapperClassname={` ${Style.wModal}`}
        isHeaderHight
        body={
          <div className={Style.ModalContainer}>
            <div
              className={`${
                select.title === "Player"
                  ? Style.eventPlayerContainer
                  : Style.eventProducerContainer
              }`}
            >
              {select.title === "Player" ? (
                <span
                  style={{
                    marginRight: "2%",
                  }}
                >
                  <Player width="50px" height="50px" fill="#fff" />
                </span>
              ) : (
                <EventSvgr width="40px" height="40px" fill="#fff" />
              )}
              {/* <Player width="40px" height="40px" fill="#fff" /> */}
              {/* <EventSvgr width="40px" height="40px" fill="#fff" /> */}
              {select.title}
            </div>
            <span className={Style.textContainer}>{select.description}</span>

            {select.status && (
              <span className={Style.textContainerDefaultText}>
                {select.defaultSignupText}
              </span>
            )}

            {!select.status && (
              <div
                className={
                  select.title === "Player" ? Style.signupGreen : Style.signup
                }
                onClick={onClickSignUpProducer}
              >
                Sign Up!
              </div>
            )}
            {select.status && (
              <div
                className={`${Style.signup} ${Style.cancel}`}
                onClick={onClickCancelProducer}
              >
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

export default SignUpMemberShipComponent;
