import React from "react";
import { MdAlbum } from "react-icons/md";
import { ImMusic } from "react-icons/im";
const VideoFooter = () => {
  return (
    <div className="video__footer">
      <h3 className="video__footer_username">@kaif</h3>
      <div className="songinfo">
        <div className="songname">
          <ImMusic className="musicIcon" />
          <span>
            <p>Dua lipa lavtaing-lavtaing-tiktok-remix-2022</p>
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
