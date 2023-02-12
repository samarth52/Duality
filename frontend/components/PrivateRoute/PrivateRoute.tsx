import React, { useContext } from "react";
import { Router, useRouter } from "next/router";
import { useAuth } from "../Firebase/Auth";

const PrivateRoute = ({ children } : any) => {
  const router = useRouter()
  const {currentUser, loading} = useAuth()
  return currentUser != null ? children: router.push('/');
}


export default PrivateRoute