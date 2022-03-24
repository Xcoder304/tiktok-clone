import { useState, useEffect } from "react";
import Videos from "./videoSection/Videos";
import "./Styles/app.css";
import { Button } from "@mui/material";
import UserSettings from "./videoSection/components/userSettings";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import { db } from "./firebase/config";

const App = () => {
  const [Allvideos, setvideos] = useState([]);

  useEffect(() => {
    const collectionRef = collection(db, "videos");
    const q = query(collectionRef);
    const display = onSnapshot(q, (snapshot) => {
      setvideos(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
    });
  }, []);

  return (
    <div className="container">
      <div className="logoWappper">
        <img src="../images/logo.png" />
      </div>
      <div className="video__container">
        {Allvideos.map(
          ({
            id,
            data: {
              videosrc,
              like,
              comment,
              share,
              username,
              caption,
              songName,
            },
          }) => (
            <Videos
              key={id}
              videoSrc={videosrc}
              likes={like}
              comments={comment}
              shares={share}
              UserName={username}
              caption={caption}
              songName={songName}
            />
          )
        )}
      </div>
      <UserSettings />
    </div>
  );
};

export default App;
