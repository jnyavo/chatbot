import React, { useState } from "react";
import Input from "./input";
import useStyles from "./style";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import * as api from "../../api/index";
import { useNavigate } from "react-router-dom";

import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
const initialState = {
  email: "",
};

const EmailConfirmation = () => {
  const classes = useStyles();
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState(initialState);
  const [showPassoword, setShowPassoword] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const forget = async (formData) => {
    try {
      const data = await api.forget(formData);

      return data.data;
    } catch (e) {
      setMessage(e.response.data.message);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await forget(formData);
    if(response){
      setMessage("check your email and spam");
      setSuccess(true);
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={6}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">Email</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Input
            name="email"
            label="Email Address"
            handleChange={handleChange}
            type="email"
          />
          {!success && (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Change Password
            </Button>
          )}
        </form>
        {success && (
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => {
              navigate("/auth");
            }}
          >
            Back to login
          </Button>
        )}
        <Typography variant="body2" color={success ? "primary" : "error"  }>{message}</Typography>
      </Paper>
    </Container>
  );
};

export default EmailConfirmation;
