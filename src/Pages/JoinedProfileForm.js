import React, { useEffect, useState } from "react";
import user from "../images/user.png";
import style from "../Styles/MyProfile.module.css";
import Loader from "../Components/Loader";
import { getSingleUserDetails } from "../api/services";
import { useNavigate } from "react-router-dom";
import backgroundDefault from "../images/background-default.png";

const JoinedProfileForm = ({ params }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [userInfo, setuserInfo] = useState({});
  const handleError = (event, type) => {
    // Handle image loading error
    if (type === "backgroundImg") {
      event.target.src = backgroundDefault;
    } else {
      event.target.src = user;
    }
    event.target.onerror = null; // To avoid infinite loop in case the backup image also fails
  };

  const handleErrorForBg = (event) => {
    // Handle image loading error
    //   event.target.src = backgroundDefault;
    event.target.style.backgroundColor = "rgba(255,255,255,0.75)";
    event.target.style.minWidth = "800px";
    event.target.onerror = null; // To avoid infinite loop in case the backup image also fails
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (params?.recentUserId !== "") {
          const data = await getSingleUserDetails(params?.recentUserId);
          console.log(data?.data);
          setuserInfo(data?.data);
        } else {
          console.log(params?.recentUserId);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  console.log(userInfo);

  const userProfileImage = userInfo?.pic ? (
    <>
      <img
        src={userInfo?.pic}
        alt="user"
        className={style.profileImage}
        onError={(e) => handleError(e, "profileImg")}
      />
    </>
  ) : (
    <>
      <img src={user} alt="user" className={style.profileImage} />
    </>
  );

  const userProfileCoverImage = userInfo?.cover_image ? (
    <>
      <img
        src={userInfo?.cover_image}
        alt="background"
        className={style.profileBackImage}
        onError={(e) => handleErrorForBg(e, "coverImage")}
      />
    </>
  ) : (
    <img
      className={style.blankCover}
      style={{ backgroundColor: "greenyellow" }}
    >
      {/* //blank */}
    </img>
  );

  const navigate = useNavigate();
  const onLastPage = () => {
    navigate("/");
  };

  return (
    <div
      className={style.formContainer}
      style={{ position: "relative", overflowX: "hidden" }}
    >
      <button className={style.backButton} onClick={onLastPage}>
        {"< back"}
      </button>
      <div className={style.container}>
        <div className={style.imageSection}>
          <div
            className={style.profileBackContainer}
            style={{ overflow: "hidden" }}
          >
            {userProfileCoverImage}
          </div>
          <div className={style.profileImageContainer}>{userProfileImage}</div>
        </div>

        <div className={style.profileTitleItem}>
          <div className={style.profileTitle}>
            {`${userInfo?.first_name || ""} ${userInfo?.last_name || ""}`}
          </div>
        </div>

        <div className={style.formDiv}>
          {/* <div className={`${style.profileItem} ${style.profileFieldItem}`}>
            <div className={style.memberDiv}>
              <div className={style.memberLbl}>Membership</div>
              <div className={style.btnSection}>
                <button className={`${style.memberbtn} ${style.playerBtn}`}>
                  <img
                    src={playerIcon}
                    className={style.eventPlayerBtnIcon}
                    alt="player"
                  />
                  Player
                </button>
                <button className={`${style.memberbtn} ${style.eventProdBtn}`}>
                  <img
                    src={whitetent}
                    className={style.eventProdBtnIcon}
                    alt="tent"
                  />
                  Event Producer
                </button>
              </div>
            </div>
          </div> */}
          <div className={style.formBox}>
            <div className={`${style.profileItem} ${style.profileFieldItem}`}>
              <div className={`${style.profileField} `}>
                <div style={{ fontSize: "12px" }}>First Name</div>
                <div
                  className={` ${style.inputField}`}
                  style={{
                    border: "0.5px solid #ffffff24",
                    borderRadius: "5px",
                    padding: "5px 5px",
                  }}
                >
                  {userInfo?.first_name && userInfo?.first_name !== ""
                    ? userInfo.first_name
                    : "No first name available"}
                </div>
              </div>
              <div className={`${style.profileField} `}>
                <div style={{ fontSize: "12px" }}>Last Name</div>
                <div
                  className={` ${style.inputField}`}
                  style={{
                    border: "0.5px solid #ffffff24",
                    borderRadius: "5px",
                    padding: "5px 5px",
                  }}
                >
                  {userInfo?.last_name && userInfo?.last_name !== ""
                    ? userInfo.last_name
                    : "No last name available"}
                </div>
              </div>
            </div>
            <div className={`${style.profileItem} ${style.profileFieldItem}`}>
              <div className={`${style.profileField} `}>
                <div style={{ fontSize: "12px" }}>Nick Name</div>
                <div
                  className={` ${style.inputField}`}
                  style={{
                    border: "0.5px solid #ffffff24",
                    borderRadius: "5px",
                    padding: "5px 5px",
                  }}
                >
                  {userInfo?.nick_name && userInfo?.nick_name !== ""
                    ? userInfo.nick_name
                    : "No nick name available"}
                </div>
              </div>
            </div>
            <div className={`${style.profileItem} ${style.profileFieldItem}`}>
              <div className={`${style.profileField} `}>
                <div style={{ fontSize: "12px" }}>Skills</div>
                <div
                  className={style.skillChipDiv}
                  style={{
                    border: "0.5px solid #ffffff24",
                    borderRadius: "5px",
                    padding: "5px 5px",
                    marginTop: "0",
                    minHeight: "40px",
                  }}
                >
                  {userInfo?.skills?.length !== 0 ? (
                    userInfo?.skills?.map((skill, index) => (
                      <span className={style.skillChip} key={index}>
                        <span>{skill}</span>
                      </span>
                    ))
                  ) : (
                    <div
                      className={style.skillChipDiv}
                      style={{ marginTop: "0" }}
                    >
                      No skills
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>{isLoading && <Loader />}</div>
      </div>
    </div>
  );
};

export default JoinedProfileForm;
