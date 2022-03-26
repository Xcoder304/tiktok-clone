import { useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import "../Styles/video/sidebar.css";
import { useNavigate } from "react-router-dom";

const VideoSideBar = ({
  OpenComments,
  setComments,
  likes,
  comments,
  shares,
  LikeTheVideo,
  hasLiked,
  user,
}) => {
  const navigate = useNavigate();
  return (
    <div className="video__sidebar">
      <div className="sidebar__wapper">
        <div className="sidebar__option">
          {hasLiked ? (
            <AiFillHeart
              className="icon HeartIcon isLike"
              onClick={user ? LikeTheVideo : () => navigate("/login")}
            />
          ) : (
            <AiOutlineHeart
              className="icon HeartIcon"
              onClick={user ? LikeTheVideo : () => navigate("/login")}
            />
          )}

          <p>{likes}</p>
        </div>

        <div className="sidebar__option">
          <FaRegCommentDots
            className="icon CommentIcon"
            onClick={
              user ? () => setComments(!OpenComments) : () => navigate("/login")
            }
          />
          <p>{comments}</p>
        </div>

        <div className="sidebar__option">
          <FiShare2 className="icon ShareIcon" />
          <p>{shares}</p>
        </div>
      </div>
    </div>
  );
};

export default VideoSideBar;
