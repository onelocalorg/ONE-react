import React, { useEffect, useState } from "react";
import Style from "../Styles/TicketCheckins.module.css";
import { PrivateComponent } from "../Components/PrivateComponent";
// import { useScrollToTop } from "../hooks/useScrollToTop";
import HeaderComponent from "../Components/HeaderComponent";
import CheckinCardComponent from "../Components/CheckinCardComponent";
import Loader from "../Components/Loader";
import user from "../images/user.png";
import { ListCheckins, onCheckin } from "../api/services";
import { useNavigate, useParams } from "react-router-dom";

const EachData = ({ element, clickOnCheckIn }) => {
  const [state, setState] = useState(false);
  return (
    <CheckinCardComponent>
      <div className={Style.container}>
        <img className={Style.img} src={element.user.pic} />

        <div className={Style.info}>
          <p
            className={Style.member_name}
          >{`${element.user.first_name}${element.user.last_name}`}</p>
          <p className={Style.event_name}>{element.event.name}</p>
          <p className={Style.member_status}>{element.ticket_name}</p>
        </div>

        <p className={Style.price}>${element.ticket_price}</p>
      </div>
      <button
        className={
          element.isCheckedIn || state ? Style.greenbutton : Style.button
        }
        onClick={async () => {
          if (!element.isCheckedIn) {
            const res = await clickOnCheckIn(element);
            if (res === true) {
              setState(true);
            }
          }
        }}
      >
        {element.isCheckedIn || state ? "Checked In" : "Check In"}
      </button>
    </CheckinCardComponent>
  );
};

const TicketCheckins = () => {
  // const [checkedin,setCheckin] = useState(false)
  const checkedin = false;
  // const { ticketId  } = useParams();
  const ticketId = "65f16e03d85036422b30db97";
  const [data, setData] = useState([]);

  const getData = async () => {
    const data = await ListCheckins(ticketId);
    setData(data.data.results);
  };

  useEffect(() => {
    getData();
  }, []);

  const clickOnCheckIn = async (data) => {
    // const ticketId =  "65ef00eca3109faf020f6662"
    const ticketId = data._id;
    const getConfirm = await onCheckin(ticketId, {
      email: data.user.email,
      is_app_user: 1,
      isCheckedIn: true,
    });

    return getConfirm;
    // console.log("getConfirm",getConfirm)
  };

  return (
    <>
      <div className={Style.mainDiv}>
        <PrivateComponent />
        <HeaderComponent />
        <div className={Style.page}>
          <div className={Style.pageHeader}>
            <h1 className={Style.title}>Garden Party</h1>
          </div>

          {data.length > 0 &&
            data.map((element) => {
              console.log("element", element);
              return (
                <EachData element={element} clickOnCheckIn={clickOnCheckIn} />
              );
            })}
        </div>
      </div>
    </>
  );
};

export default TicketCheckins;
