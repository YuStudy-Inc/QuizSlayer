import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import axios from 'axios';
import UserData from '../UserData';

const URI = import.meta.env.VITE_APP_URI;

const AuthenticateUserRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    axios({
      method: "get",
      url: URI + "users/getUser",
      withCredentials:true,
  })
  .then((response) => {
      setIsAuthenticated(true);
      UserData.updateUserData(response.data.user);
  })
  .catch((response) => {
    setIsAuthenticated(false);
  })
  }, []);

  if (isAuthenticated === null) {
    return <div></div>;
  }
  console.log(isAuthenticated);

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default AuthenticateUserRoute;
