import { useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import "../Styles/video/sidebar.css";

const VideoSideBar = ({ OpenComments, setComments }) => {
  const [isLike, setLike] = useState(false);

  return (
    <div className="video__sidebar">
      <div className="sidebar__wapper">
        <div className="sidebar__option">
          {isLike ? (
            <AiFillHeart
              className="icon HeartIcon isLike"
              onClick={() => setLike(!isLike)}
            />
          ) : (
            <AiOutlineHeart
              className="icon HeartIcon"
              onClick={() => setLike(!isLike)}
            />
          )}
          <p>55</p>
        </div>

        <div className="sidebar__option">
          <FaRegCommentDots
            className="icon CommentIcon"
            onClick={() => setComments(!OpenComments)}
          />
          <p>15</p>
        </div>

        <div className="sidebar__option">
          <FiShare2 className="icon ShareIcon" />
          <p>15</p>
        </div>
      </div>
    </div>
  );
};

export default VideoSideBar;
