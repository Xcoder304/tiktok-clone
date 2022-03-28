import { useState, useEffect } from "react";
import Videos from "./videoSection/Videos";
import "./Styles/app.css";
import UserSettings from "./videoSection/components/userSettings";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import { db, auth } from "./firebase/config";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./videoSection/components/Login";
import Signup from "./videoSection/components/SignUp";
import UploadVideo from "./videoSection/components/UploadVideo";
import { onAuthStateChanged } from "firebase/auth";

const App = () => {
  const [Allvideos, setvideos] = useState([]);
  const [user, setuser] = useState(null);

  useEffect(() => {
    const collectionRef = collection(db, "videos");
    const q = query(collectionRef, orderBy("time", "desc"));
    const display = onSnapshot(q, (snapshot) => {
      setvideos(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
    });
  }, []);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setuser(authUser);
      } else {
        setuser(null);
      }
    });
    return () => unsub();
  }, []);

  return (
    <Router>
      <div className="container">
        <div className="logoWappper">
          <img src="../images/logo.png" />
        </div>
        <div className="divder"></div>
        <div className="video__container">
          {Allvideos.map(
            ({ id, data: { videosrc, username, caption, songName } }) => {
              return (
                <Videos
                  key={id}
                  videoId={id}
                  user={user}
                  videoSrc={videosrc}
                  UserName={username}
                  caption={caption}
                  songName={songName}
                />
              );
            }
          )}
        </div>
        <UserSettings user={user} />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/signup"
            element={<Signup user={user} setuser={setuser} />}
          />
          <Route path="/uploadvideo" element={<UploadVideo user={user} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
