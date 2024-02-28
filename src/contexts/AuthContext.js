import React, { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChange,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "../service/firebase";
import axios from "axios";
import BASEURL from "../config/baseurl";
const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  const signUp = async ({email, password,...userInfo}) => {
    const {user,uid,...data}= await createUserWithEmailAndPassword(email, password);
 

    const {data:response}=await axios.post(`${BASEURL}/api/user/register-user`,{...userInfo,roleType:"client"},{
      headers:{
        authtoken:user.accessToken
      }
    })
    data.userInfo=response;
  return data;
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(email, password);
  };

  const logOut = () => {
    return signOut();
  };

  const resetUserPassword = (email) => {
    return sendPasswordResetEmail(email);
  };

  const value = {
    currentUser,
    signUpUser: signUp,
    signIn: login,
    logOut,
    resetUserPassword,
  };

  useEffect(() => {
    const unsubcribe = onAuthStateChange(async (user) => {
      if (user) {
        const { proactiveRefresh } = user;
      
        if (proactiveRefresh && proactiveRefresh.user) {
          console.log(proactiveRefresh.user,"proactive refresh")

          const {data}= await axios.get(`${BASEURL}/api/user/user-info`,{headers:{authtoken:proactiveRefresh.user.accessToken}});

          setCurrentUser({...proactiveRefresh.user,userInfo:data});
        }
      }

      setLoading(false);
    });

    return unsubcribe;
  }, []);
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
