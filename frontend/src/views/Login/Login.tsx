import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import AccountCircle from "@material-ui/icons/AccountCircle";
import VpnKey from "@material-ui/icons/VpnKey";

interface AuthProps {
  setAuth: (token: string) => void;
  isAuthenticated: boolean;
}

const Login: React.FC<AuthProps> = ({ setAuth, isAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const classes = useStyles();
  const history = useHistory();

  const authenticate = async () => {
    const payload = {
      username,
      password,
    };
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    };

    const resp = await fetch("http://localhost:8000/auth/", options);
    const data = await resp.json();
    if (resp.status === 200) {
      setAuth(data.token);
      history.push("/");
    }
  };

  //if(isAuthenticated) {
  //    history.push('/');
  //}

    return (
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <FormControl className={classes.margin}>
          <TextField
            id="standard-read-only-input"
            onChange={(e) => setUsername(e.target.value)}
            label="Username"
            variant="outlined"
            type="text"
          />
          <TextField
            id="outlined-password-input"
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            type="password"
            variant="outlined"
          />
        </FormControl>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={authenticate}
        >
          Sign In
        </Button>
      </div>
    );
};

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  margin: {
    margin: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default Login;
