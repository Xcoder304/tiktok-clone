import { useState, useRef } from "react";
import "../Styles/video/video.css";
import VideoFooter from "./VideoFooter";
import VideoSideBar from "./VideoSideBar";
import CommmentsSec from "./components/CommmentsSec";

const Videos = () => {
  const [isVideoPlaying, SetVideoPlaying] = useState(false);
  const VideoPlay = useRef(null);
  const [OpenComments, setComments] = useState(false);

  const PlayTheVideo = () => {
    SetVideoPlaying(!isVideoPlaying);

    isVideoPlaying ? VideoPlay.current.pause() : VideoPlay.current.play();
  };

  return (
    <div className="video">
      <video
        src="https://v16-webapp.tiktok.com/34a5c28e5081e638358991a6f7ced3df/623c472b/video/tos/useast2a/tos-useast2a-pve-0037-aiso/0d04584ab33543dda91a67852dede58d/?a=1988&br=1488&bt=744&cd=0%7C0%7C1%7C0&ch=0&cr=0&cs=0&cv=1&dr=0&ds=3&er=&ft=XOQ9-3Aonz7ThbvUMDXq&l=202203240425240102450491931E02AEC3&lr=tiktok_m&mime_type=video_mp4&net=0&pl=0&qs=0&rc=MzhlNGU6ZjV1NjMzZjczM0ApaWhlM2g8OTs3NztpZGc5OWdvLjNmcjQwZ2hgLS1kMWNzc2JeMi4yYzAyMi9jXmJfNF46Yw%3D%3D&vl=&vr="
        onClick={PlayTheVideo}
        ref={VideoPlay}
        loop
        className="video__player"
      />
      <VideoFooter />
      <VideoSideBar OpenComments={OpenComments} setComments={setComments} />
      {/* sections */}
      <CommmentsSec OpenComments={OpenComments} setComments={setComments} />
    </div>
  );
};

export default Videos;