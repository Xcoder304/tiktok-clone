import { useState, useRef } from "react";
import "./Styles/video.css";

const Videos = () => {
  const [isVideoPlaying, SetVideoPlaying] = useState(false);
  const VideoPlay = useRef(null);

  const PlayTheVideo = () => {
    SetVideoPlaying(!isVideoPlaying);

    isVideoPlaying ? VideoPlay.current.pause() : VideoPlay.current.play();
  };

  return (
    <div className="video">
      <video
        src="https://v16-webapp.tiktok.com/02570efb826cfbc46a680e4f52eab9b9/623b9536/video/tos/useast2a/tos-useast2a-pve-0037-aiso/0d04584ab33543dda91a67852dede58d/?a=1988&br=1488&bt=744&cd=0%7C0%7C1%7C0&ch=0&cr=0&cs=0&cv=1&dr=0&ds=3&er=&ft=XOQ9-3Aonz7Th9WrMDXq&l=2022032315460701025105822020241FD0&lr=tiktok_m&mime_type=video_mp4&net=0&pl=0&qs=0&rc=MzhlNGU6ZjV1NjMzZjczM0ApaWhlM2g8OTs3NztpZGc5OWdvLjNmcjQwZ2hgLS1kMWNzc2JeMi4yYzAyMi9jXmJfNF46Yw%3D%3D&vl=&vr="
        onClick={PlayTheVideo}
        ref={VideoPlay}
        loop
        className="video__player"
      />
    </div>
  );
};

export default Videos;
