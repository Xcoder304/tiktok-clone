import React from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import IconButton from "@mui/material/IconButton";
import { RiSendPlaneFill } from "react-icons/ri";
import "../../Styles/video/comments.css";

const CommmentsSec = ({ OpenComments, setComments, comments }) => {
  return (
    <div
      className={
        OpenComments ? "comments__container open" : "comments__container"
      }
    >
      <div className="comment__closeButton">
        <IconButton
          aria-label="delete"
          size="small"
          style={{ background: "rgba(225, 225, 225, 0.4)" }}
        >
          <CloseRoundedIcon
            className="icon"
            onClick={() => setComments(!OpenComments)}
          />
        </IconButton>
      </div>

      {comments.map((data) => {
        return (
          <div className="comments__wapper">
            <div className="comment">
              <div className="comment__info">
                <span className="userName">{data.data().username}</span>
                <span className="time">12-6-2020</span>
              </div>
              <div className="comment__text">
                <p>{data.data().comment}</p>
              </div>
            </div>
          </div>
        );
      })}

      {/* add comment */}
      <div className="comment__addComent">
        <form>
          <input type="text" placeholder="Comment.." />
          <div className="comment__btn">
            <RiSendPlaneFill className="icon" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommmentsSec;
