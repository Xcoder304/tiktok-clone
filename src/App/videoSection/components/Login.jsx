import { useState } from "react";
import "../../Styles/registerSec/login.css";
import TextField from "@mui/material/TextField";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import IconButton from "@mui/material/IconButton";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";

const Login = ({ user }) => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [isLaoding, setLoading] = useState(false);

  const navigate = useNavigate();

  const LoginTheuser = async () => {
    try {
      setLoading(true);
      const LoginUser = await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
      navigate("/");
    } catch (err) {
      setLoading(false);
      setemail("");
      setpassword("");
      alert("Whoops! Look SomeThinge Went Wrong Please Try Agian");
    }
  };

  return (
    <div className="login__section">
      <div className="login__container">
        <div className="login__header">
          <h1>Login To TikTok</h1>
          <div className="login__closingBtn">
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
            className="loginBtn"
            onClick={LoginTheuser}
            style={
              isLaoding
                ? { opacity: "0.4", pointerEvents: "none" }
                : { opacity: "1", pointerEvents: "visible" }
            }
          >
            Log In
          </Button>
        </form>
        <div className="login__footer">
          <span>i dont have any account</span>
          <Link to="/signup">
            <h4>create a account</h4>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
