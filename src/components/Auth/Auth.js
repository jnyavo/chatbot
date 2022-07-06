import React, { useState } from "react";
import Input from "./input";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import jwt_decode from "jwt-decode";
import * as api from "../../api/index";
import { useStateContext } from "../../contexts/ContextProvider";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import { GoogleLogin } from "@react-oauth/google";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import useStyles from "./style";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const { user, setUser, setLocalUser } = useStateContext();
  const signin = async (formData) => {
    try {
      const data = await api.signIn(formData);

      return data.data;
    } catch (error) {
      console.log(error);
    }
  };

  const signup = async (formData) => {
    try {
      formData.type = "Users";
      const data = await api.signUp(formData);
      return data.data;
    } catch (error) {
      console.log(error);
    }
  };

  const classes = useStyles();
  const [formData, setFormData] = useState(initialState);
  const [showPassoword, setShowPassoword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const discord = async() => {
    const user = await api.discord();
  }
  const handleShowPassword = () =>
    setShowPassoword((prevShowPassword) => !prevShowPassword);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSignup) {
      try {
        const userConnected = await signup(formData);

        if (userConnected) {
          setLocalUser(userConnected);
          if (location.state?.from) {
            navigate(location.state.from);
          } else {
            navigate("/");
          }
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        const userConnected = await signin(formData);

        if (userConnected) {
          setLocalUser(userConnected);
          if (location.state?.from) {
            navigate(location.state.from);
          } else {
            navigate("/");
          }
        }
      } catch (e) {
        console.log(e);
      }
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassoword(false);
  };
  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={6}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? "Sign up" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="firstName"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="lastName"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassoword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>
          <GoogleLogin
            auto_select
            onSuccess={(credentialResponse) => {
              const decoded = jwt_decode(credentialResponse.credential);
              try {
                localStorage.setItem(
                  "profile",
                  JSON.stringify({
                    result: decoded,
                    token: credentialResponse.credential,
                  })
                );
                if (location.state?.from) {
                  navigate(location.state?.from);
                } else {
                  navigate("/");
                }
              } catch (err) {
                console.log(err);
              }
            }}
            onError={() => {
              console.log("Login Failed");
            }}
            useOneTap
          />
          <Button onClick = {discord}>
            Discord
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have an account ? Sign In"
                  : "Don't have an account ? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
