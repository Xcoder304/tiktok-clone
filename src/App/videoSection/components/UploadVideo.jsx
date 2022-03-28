import { useState } from "react";
import TextField from "@mui/material/TextField";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import IconButton from "@mui/material/IconButton";
import { Link, useNavigate } from "react-router-dom";
import "../../Styles/video/upload.css";
import { Button } from "@mui/material";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../../firebase/config";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const UploadVideo = ({ user }) => {
  const [caption, setcaption] = useState("");
  const [songname, setsongname] = useState("");
  const [video, setvideo] = useState(null);
  const [progessLoading, setProgressLoading] = useState(0);
  const [loading, setloading] = useState(false);

  const navigate = useNavigate();

  const GetTheVideo = (e) => {
    if (e.target.files[0]) {
      setvideo(e.target.files[0]);
    }
  };

  const UploadTheVideo = () => {
    const storageRef = ref(storage, `videos/${video.name}`);
    const uploadTakes = uploadBytesResumable(storageRef, video);

    uploadTakes.on(
      "state_changed",
      (snapshot) => {
        const Currentprogress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setloading(true);

        setProgressLoading(Currentprogress);
      },
      (errr) => {
        alert("Whoops! someThings want wrong Please Try Agian");
      },
      () => {
        getDownloadURL(uploadTakes.snapshot.ref).then((url) => {
          addDoc(collection(db, "videos"), {
            caption: caption,
            songName: songname,
            username: user?.displayName,
            videosrc: url,
            time: serverTimestamp(),
          });
          setloading(false);
        });
        setcaption("");
        setsongname("");
        setvideo(null);
        setProgressLoading(0);
        navigate("/");
      }
    );
  };

  return (
    <div className="videoUpload__section">
      <div className="videoUpload__container">
        <div className="videoUpload__header">
          <h1>Upload the video</h1>
          <div className="videoUpload__closingBtn">
            <Link to="/">
              <IconButton
                aria-label="delete"
                size="medium"
                style={{ background: "rgba(225, 225, 225, 0.4)" }}
              >
                <CloseRoundedIcon className="icon" />
              </IconButton>
            </Link>
          </div>
        </div>
        <form onSubmit={(e) => e.preventDefault()}>
          <TextField
            // helperText="Please enter your name"
            id="demo-helper-text-misaligned"
            label="Caption"
            className="input"
            type="text"
            onChange={(e) => setcaption(e.target.value)}
            autoComplete="off"
          />
          <TextField
            // helperText="Please enter your name"
            id="demo-helper-text-misaligned"
            label="Song Name"
            className="input"
            type="text"
            onChange={(e) => setsongname(e.target.value)}
            autoComplete="off"
          />
          <div className="videoUpload__chooseFileConatainer">
            <label htmlFor="files" className="videoUpload__chooseFileBtn">
              Selete Your Video
            </label>
            <input
              id="files"
              style={{ visibility: "hidden" }}
              type="file"
              onChange={GetTheVideo}
            />
            <span className="videoName">
              {video?.name.substring(0, 40).concat("....")}
            </span>
            {/* <div className="videoUpload__video__info">
              <h4>
                video Length : <span>25s</span>
              </h4>
              <h4>
                file size : <span>{}</span>
              </h4>
            </div> */}
          </div>

          <Button
            variant="contained"
            size="medium"
            className="videoUpload__uploadBtn"
            onClick={UploadTheVideo}
            style={
              loading
                ? { opacity: "0.4", pointerEvents: "none" }
                : { opacity: "1", pointerEvents: "visible" }
            }
          >
            Upload Video
          </Button>
        </form>
        {loading ? (
          <div className="videoUpload__progressbarContainer">
            <div className="videoUpload__progressbar">
              <span style={{ width: `${progessLoading}%` }}></span>
            </div>
            <h3>{progessLoading}%</h3>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default UploadVideo;
