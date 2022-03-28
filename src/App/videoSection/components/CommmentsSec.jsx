import { useState } from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import IconButton from "@mui/material/IconButton";
import { RiSendPlaneFill } from "react-icons/ri";
import "../../Styles/video/comments.css";
import { db } from "../../firebase/config";
import { addDoc, collection, query, serverTimestamp } from "firebase/firestore";

const CommmentsSec = ({
  OpenComments,
  setComments,
  comments,
  videoId,
  user,
}) => {
  const [commentTxt, setcommentTxt] = useState("");

  const AddComment = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "videos", videoId, "comments"), {
      comment: commentTxt,
      username: user?.displayName,
      time: serverTimestamp(),
    });
    setcommentTxt("");
  };

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
                {/* <span className="time">{new Date().date.date().time}</span> */}
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
        <form onSubmit={AddComment}>
          <input
            type="text"
            placeholder="Comment.."
            onChange={(e) => setcommentTxt(e.target.value)}
            value={commentTxt}
          />
          <button type="submit" className="comment__btn">
            <RiSendPlaneFill className="icon" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default CommmentsSec;
