import { useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import "../Styles/video/sidebar.css";
import { db } from "../firebase/config";
import { addDoc, collection, updateDoc } from "firebase/firestore";

const VideoSideBar = ({
  OpenComments,
  setComments,
  likes,
  comments,
  shares,
}) => {
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
          <p>{isLike ? likes + 1 : likes}</p>
        </div>

        <div className="sidebar__option">
          <FaRegCommentDots
            className="icon CommentIcon"
            onClick={() => setComments(!OpenComments)}
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
