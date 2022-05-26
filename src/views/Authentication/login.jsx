import React, { useState } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Paper,
  Grid,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";
import useStyles from "./style";
import axios from "axios";
import PropTypes from "prop-types";
import useToken from "../../useToken";
import loginImage from "../../assets/img/loginImg.jpg";
import { ConstructionOutlined, WindowSharp } from "@mui/icons-material";

async function loginUser(username, password) {
  return axios.post(process.env.REACT_APP_API + "/auth/signin", {
    username,
    password,
  });
}

export default function Login() {
  const classes = useStyles();
  const { token, setToken } = useToken();
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(process.env.REACT_APP_API + "/auth/signin", { username, password })
      .then((response) => {
        if (response.status != 200) alert(response.data);
        else {
          setToken(response.data.accessToken);
          window.location.replace("/gs/dashboard");
        }
      })
      .catch((e) => console.log(e));
  };

  const handleEdit = () => {};

  if (token) {
    window.location.replace("/gs/dashboard");
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <FormControl
              variant="outlined"
              className={classes.formControl}
            ></FormControl>
            <TextField
              type="text"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Username"
              name="username"
              autoComplete="Username"
              autoFocus
              required
              onChange={(e) => setUserName(e.target.value)}
            />

            <TextField
              type="password"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              onSubmit={handleSubmit}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link
                  href="/signup"
                  onvariant="body2"
                  onClick={() => window.location.replace("/signup")}
                >
                  {"Register"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

//added newly
Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
