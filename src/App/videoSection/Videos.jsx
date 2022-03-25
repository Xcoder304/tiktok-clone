import { useState, useRef, useEffect } from "react";
import "../Styles/video/video.css";
import VideoFooter from "./VideoFooter";
import VideoSideBar from "./VideoSideBar";
import CommmentsSec from "./components/CommmentsSec";
import { db } from "../firebase/config";
import { collection, query, onSnapshot, addDoc } from "firebase/firestore";

const Videos = ({ videoId, videoSrc, UserName, caption, songName }) => {
  const [isVideoPlaying, SetVideoPlaying] = useState(false);
  const VideoPlay = useRef(null);
  const [OpenComments, setOpenComments] = useState(false);
  const [allcomments, setcomments] = useState([]);

  useEffect(() => {
    onSnapshot(
      query(collection(db, "videos", videoId, "comments")),
      (snapshot) => {
        setcomments(snapshot.docs);
      }
    );
  }, [db]);

  const PlayTheVideo = () => {
    SetVideoPlaying(!isVideoPlaying);

    isVideoPlaying ? VideoPlay.current.pause() : VideoPlay.current.play();
  };

  return (
    <div className="video">
      <video
        src={videoSrc}
        onClick={PlayTheVideo}
        ref={VideoPlay}
        loop
        className="video__player"
      />
      <VideoFooter UserName={UserName} caption={caption} songName={songName} />

      <VideoSideBar
        OpenComments={OpenComments}
        setComments={setOpenComments}
        // likes={likes}
        comments={allcomments.length}
        // shares={shares}
      />
      {/* sections */}
      <CommmentsSec OpenComments={OpenComments} setComments={setOpenComments} />
    </div>
  );
};

export default Videos;
