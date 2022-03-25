import { useState, useEffect } from "react";
import Videos from "./videoSection/Videos";
import "./Styles/app.css";
import UserSettings from "./videoSection/components/userSettings";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import { db } from "./firebase/config";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./videoSection/components/Login";
import Signup from "./videoSection/components/SignUp";

const App = () => {
  const [Allvideos, setvideos] = useState([]);
  const [user, setuser] = useState(null);

  console.log(user);

  useEffect(() => {
    const collectionRef = collection(db, "videos");
    const q = query(collectionRef);
    const display = onSnapshot(q, (snapshot) => {
      setvideos(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
    });
  }, []);

  return (
    <Router>
      <div className="container">
        <div className="logoWappper">
          <img src="../images/logo.png" />
        </div>
        <div className="video__container">
          {Allvideos.map(
            ({ id, data: { videosrc, username, caption, songName } }) => {
              return (
                <Videos
                  key={id}
                  videoId={id}
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
        </Routes>
      </div>
    </Router>
  );
};

export default App;
