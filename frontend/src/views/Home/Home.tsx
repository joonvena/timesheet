import React, { useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { AuthContext } from "../../authContext";

import Navigation from '../../components/Navigation/Navigation';
import HourList from '../../components/HourList/HourList';

const Home: React.FC = () => {
  const auth = useContext(AuthContext);

  if (auth.token) {
    return (
      <div>
        <Navigation />
        <HourList />
      </div>
    );
  } else {
    return <Redirect to="/login" />;
  }
};

export default Home;
