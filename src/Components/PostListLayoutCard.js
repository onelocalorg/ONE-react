import React from "react";
import PostStyle from "../Styles/Post.module.css";
import profileImg from "../images/post-profile-default.png";
import likeImg from "../images/like-img.svg";
import likeImgOutline from "../images/like-img-outline.svg";
import commentImg from "../images/comment-img.svg";

function PostListLayoutCard({ postData }) {
  return (
    <div className={PostStyle.postCardMainDiv}>
      <div className={PostStyle.authorSection}>
        <div className={PostStyle.authorDetail}>
          <div>
            <img src={profileImg} alt="event" className={PostStyle.authorImg} />
          </div>
          <div>
            <div>{`${postData?.user_id?.first_name} ${postData?.user_id?.last_name}`}</div>
            <div className={PostStyle.authorTime}>{postData?.date}</div>
          </div>
        </div>

        <div className={PostStyle.topSection}>
          {/* <span>$4500</span> */}
          {/* <span>
            <img
              src={likeImg}
              alt="like"
              className={PostStyle.topSectionLikeImg}
            />
          </span> */}
        </div>
      </div>
      <div className={PostStyle.postContent}>{postData?.content}</div>
      <div className={PostStyle.postImageSection}>
        <img
          src={postData?.image[0]}
          alt="post-image"
          className={PostStyle.postImage}
        />
      </div>
      <div className={PostStyle.likeCommentSectionLable}>
        <div>
          <span className={PostStyle.likeCount}>
            {postData?.gratis ? `+${postData?.gratis}` : "0"}
          </span>
          <span>
            <img
              src={likeImgOutline}
              alt="like"
              className={PostStyle.likeCountImg}
            />
          </span>
        </div>
        <div>
          <span>{postData?.comment}</span>
          <span>
            <img
              src={commentImg}
              alt="comment"
              className={PostStyle.commentCountImg}
            />
          </span>
        </div>
      </div>
      <div className={PostStyle.likeCommentSection}>
        <div className={PostStyle.likeCommentLeftSection}>
          <img
            src={likeImgOutline}
            alt="like"
            className={PostStyle.likeSectionImg}
          />
        </div>
        <div className={PostStyle.likeCommentRightSection}>Comment</div>
      </div>
    </div>
  );
}

export default PostListLayoutCard;
