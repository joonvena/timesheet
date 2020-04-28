import React, { useState, useEffect } from "react";
import { AuthContext } from "./authContext";
import { Switch, Route, BrowserRouter } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import Home from "./views/Home/Home";
import Login from "./views/Login/Login";

const App: React.FC = () => {
  const token = localStorage.getItem('token');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<string | null>(token); 

  const classes = useStyles();

  const setAuth = (token: string) => {
    localStorage.setItem('token', token);
    setUser(token);
    setIsAuthenticated(true);
  };

  return (
    <BrowserRouter>
      <Container className={classes.root}>
        <Switch>
          <AuthContext.Provider value={{token: user}}>
            <Route exact path="/" component={Home} />
            <Route
              path="/login"
              render={() => (
                <Login
                  setAuth={setAuth}
                  isAuthenticated={isAuthenticated}
                />
              )}
            />
          </AuthContext.Provider>
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingLeft: 0,
    paddingRight: 0,
  },
}));

export default App;
