import React from "react";
import PostStyle from "../Styles/Post.module.css";
import profileImg from "../images/post-profile-default.png";

function PostListTopCard() {
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
        <div className={PostStyle.label}>Offer</div>
        <div className={PostStyle.label}>Request</div>
        <div className={PostStyle.label}>Gratitude</div>
      </div>
    </div>
  );
}

export default PostListTopCard;
