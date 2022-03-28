import { useState, useRef, useEffect } from "react";
import "../Styles/video/video.css";
import VideoFooter from "./VideoFooter";
import VideoSideBar from "./VideoSideBar";
import CommmentsSec from "./components/CommmentsSec";
import { AiFillHeart } from "react-icons/ai";
import { db } from "../firebase/config";
import {
  collection,
  query,
  onSnapshot,
  addDoc,
  setDoc,
  doc,
  deleteDoc,
  orderBy,
} from "firebase/firestore";

const Videos = ({ videoId, videoSrc, UserName, caption, songName, user }) => {
  const [isVideoPlaying, SetVideoPlaying] = useState(false);
  const VideoPlay = useRef(null);
  const [OpenComments, setOpenComments] = useState(false);
  const [allcomments, setcomments] = useState([]);
  const [likes, setlikes] = useState([]);
  const [hasLiked, sethasLiked] = useState(false);

  // for getting all the comments
  useEffect(() => {
    onSnapshot(
      query(
        collection(db, "videos", videoId, "comments"),
        orderBy("time", "desc")
      ),
      (snapshot) => {
        setcomments(snapshot.docs);
      }
    );
  }, [db]);

  // for getting all the likes
  useEffect(() => {
    onSnapshot(
      query(collection(db, "videos", videoId, "likes")),
      (snapshot) => {
        setlikes(snapshot.docs);
      }
    );
  }, [db]);

  useEffect(() => {
    sethasLiked(likes.findIndex((like) => like?.id === user?.uid) != -1);
  });

  const LikeTheVideo = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, "videos", videoId, "likes", user?.uid));
    } else {
      await setDoc(doc(db, "videos", videoId, "likes", user?.uid), {
        username: user?.displayName,
      });
    }
  };

  const PlayTheVideo = () => {
    SetVideoPlaying(!isVideoPlaying);
    isVideoPlaying ? VideoPlay.current.pause() : VideoPlay.current.play();
  };

  const DoubleClickVideo = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, "videos", videoId, "likes", user?.uid));
    } else {
      await setDoc(doc(db, "videos", videoId, "likes", user?.uid), {
        username: user?.displayName,
      });
    }
  };

  return (
    <div className="video">
      <div className={`video__likenAimation ${hasLiked ? "Like" : ""}`}>
        <AiFillHeart className="icon" />
      </div>
      <video
        src={videoSrc}
        onClick={PlayTheVideo}
        onDoubleClick={DoubleClickVideo}
        ref={VideoPlay}
        loop
        className="video__player"
      />
      <VideoFooter UserName={UserName} caption={caption} songName={songName} />

      <VideoSideBar
        OpenComments={OpenComments}
        setComments={setOpenComments}
        likes={likes.length}
        comments={allcomments.length}
        LikeTheVideo={LikeTheVideo}
        hasLiked={hasLiked}
        user={user}
      />
      {/* sections */}
      <CommmentsSec
        OpenComments={OpenComments}
        setComments={setOpenComments}
        comments={allcomments}
        videoId={videoId}
        user={user}
      />
    </div>
  );
};

export default Videos;
