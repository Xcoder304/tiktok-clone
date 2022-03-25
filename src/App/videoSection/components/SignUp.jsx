import { useState, useEffect } from "react";
import "../../Styles/registerSec/signup.css";
import TextField from "@mui/material/TextField";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import IconButton from "@mui/material/IconButton";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../../firebase/config";

const Signup = ({ user, setuser }) => {
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [isLoading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (auth) => {
      if (auth) {
        setuser(auth);
      } else {
        setuser(null);
      }
    });

    return () => unsub();
  }, [user, username]);

  const SignUpTheUser = async () => {
    try {
      setLoading(true);
      const signupuser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const settheusernam = await updateProfile(auth.currentUser, {
        displayName: username,
      });
      setLoading(false);
      navigate("/");
    } catch {
      setLoading(false);
      setusername("");
      setemail("");
      setpassword("");
      alert("sorry someThing is wrong please try agian");
    }
  };

  return (
    <div className="signup__section">
      <div className="signup__container">
        <div className="signup__header">
          <h1>signup To TikTok</h1>
          <div className="signup__closingBtn">
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
        <form>
          <TextField
            // helperText="Please enter your name"
            id="demo-helper-text-misaligned"
            label="User Name"
            className="input"
            type="text"
            onChange={(e) => setusername(e.target.value)}
          />
          <TextField
            // helperText="Please enter your name"
            id="demo-helper-text-misaligned"
            label="Email"
            className="input"
            type="email"
            onChange={(e) => setemail(e.target.value)}
          />
          <TextField
            // helperText="Please enter your name"
            id="demo-helper-text-misaligned"
            label="Password"
            className="input"
            type="password"
            onChange={(e) => setpassword(e.target.value)}
          />
          <Button
            variant="contained"
            size="medium"
            className="signupBtn"
            onClick={SignUpTheUser}
            style={
              isLoading
                ? { opacity: "0.4", pointerEvents: "none" }
                : { opacity: "1", pointerEvents: "visible" }
            }
          >
            sign up
          </Button>
        </form>
        <div className="signup__footer">
          <span>Back To ?</span>
          <Link to="/login">
            <h4>Login</h4>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
