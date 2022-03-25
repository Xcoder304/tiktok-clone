import React from "react";
import { MdAlbum } from "react-icons/md";
import { ImMusic } from "react-icons/im";
import "../Styles/video/footer.css";

const VideoFooter = ({ UserName, caption, songName }) => {
  return (
    <div className="video__footer">
      <h3 className="video__footer_username">@{UserName}</h3>
      <div className="video__caption">
        <p>{caption} </p>
      </div>
      <div className="songinfo">
        <div className="songname">
          <ImMusic className="musicIcon" />
          <span>
            <p>{songName}</p>
          </span>
        </div>
        <img
          src="https://cdn-icons-png.flaticon.com/512/26/26805.png"
          className="albumIcon"
        />
      </div>
    </div>
  );
};

export default VideoFooter;
