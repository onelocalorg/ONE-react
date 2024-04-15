import React, { useState } from "react";
import PostStyle from "../Styles/Post.module.css";
import profileImg from "../images/post-profile-default.png";
import OfferPostListComponent from "../Components/OfferPostComponent";

function PostListTopCard() {
  const [currentFocus, setCurrentFocus] = useState(null);
  const [Modal, setModalClose] = useState(false);
  const openModal = () => {
    setModalClose(true);
  };
  return (
    <div className={PostStyle.topCardMainDiv}>
      <div className={PostStyle.topSection}>
        <img src={profileImg} alt="event" className={PostStyle.profileImg} />
        <input
          type="text"
          placeholder="What do you want to post?"
          className={PostStyle.inputBox}
        />
      </div>
      <div className={PostStyle.separaterLine}></div>
      <div className={PostStyle.bottomSection}>
        <div className={PostStyle.label}></div>
        <div
          className={PostStyle.label}
          onClick={() => {
            setCurrentFocus("offer");
            openModal();
          }}
        >
          Offer
        </div>
        <div
          className={PostStyle.label}
          onClick={() => {
            setCurrentFocus("request");
            openModal();
          }}
        >
          Request
        </div>
        <div
          className={PostStyle.label}
          onClick={() => {
            setCurrentFocus("gratis");
            openModal();
          }}
        >
          Gratitude
        </div>
      </div>
      {
        <OfferPostListComponent
          setModalClose={setModalClose}
          Modal={Modal}
          currentFocus={currentFocus}
          setCurrentFocus={setCurrentFocus}
        />
      }
    </div>
  );
}

export default PostListTopCard;
