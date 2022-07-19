import React, { useState } from "react";
import * as api from "../api/index";
import Input from "./Auth/input";
import { useNavigate } from "react-router-dom";
import useStyles from "./style";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useStateContext } from "../contexts/ContextProvider";

const UpdateProfile = () => {
  const { user, setUser, setLocalUser } = useStateContext();
  const initialState = {
    id: user.result._id,
    name: user.result.name,
    email: user.result.email,
    password: "",
    newPassword: "",
    confirmPassword:""
  };

  const classes = useStyles();
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState(initialState);
  const [showPassoword, setShowPassoword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const update = async (formData) => {
    try {
      const data = await api.edit(formData);
      return data.data;
    } catch (e) {
      setMessage(e.response.data.message);
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleShowPassword = () =>
    setShowPassoword((prevShowPassword) => !prevShowPassword);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const userConnected = await update(formData);
    if (userConnected) {

      setSuccess(true);
      setMessage("successfully updated");
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={6}>
        <Typography variant="h5">Edit Profile</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <>
              <Input
                name="name"
                label="Name"
                defaultValue={user?.result.name}
                handleChange={handleChange}
              />
              <Input
                name="email"
                label="Email Address"
                defaultValue={user?.result.email}
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

              <Input
                name="newPassword"
                label=" new Password"
                required={false}
                handleChange={handleChange}
                type={showPassoword ? "text" : "password"}
                handleShowPassword={handleShowPassword}
              />
              <Input
                name="confirmPassword"
                label=" confirm Password"
                required={false}
                handleChange={handleChange}
                type={showPassoword ? "text" : "password"}
                handleShowPassword={handleShowPassword}
              />
            </>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Update
          </Button>
        </form>
        <Typography variant="body2" color={success ? "primary" : "error"}>
          {message}
        </Typography>
      </Paper>
    </Container>
  );
};

export default UpdateProfile;
