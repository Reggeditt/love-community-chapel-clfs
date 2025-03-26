'use client';

import { message } from "antd";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { addDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, usersCollection } from "../firebase";
import { redirect, useRouter } from "next/navigation";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        console.log('User is logged in:', currentUser);
      } else {
        setUser(null);
        console.log('No user is logged in');
      }
    });

    return () => unsubscribe();
  }, []);

  const signupUser = async (email, password, role, name) => {
    try {
      createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
        const user = userCredential.user;
        setUser(user)
        addDoc(usersCollection, {
          email: user.email,
          uid: user.uid,
          username: user.displayName || name,
          role,
          password,
        });
        message.success('User account created successfully');
      });
    } catch (error) {
      message.error(error);
    }
  };

  const signInUser = async (email, password) => {
    console.log('sign in user called with ', email, password)
    try {
      signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
        const user = userCredential.user;
        console.log('user signed in', user);
        setUser(user);
        message.success('User signed in successfully');
        redirect('/dashboard')
      }).catch((error) => {
        message.error(error.message);
      });
    } catch (error) {
      message.error(error);
    }
  };

  const signinUserWithGoogle = () => {
    console.log('signing up with google');
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      setUser(user);
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
  };

  const signupUserWithGoogle = () => {
    console.log('signing up with google');
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then((result) => {
      console.log(result);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      addDoc(usersCollection, {
        email: user.email,
        uid: user.uid,
        username: user.displayName,
      });
      setUser(user);
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
  };

  const signOutUser = () => {
    signOut(auth).then(() => {
      setUser(null);
      message.success('User signed out successfully');
      redirect('/login');
    }).catch((error) => {
      message.error(error.message);
    });
  };

  return (
    <AuthContext.Provider value={{
      user,
      signupUser, signInUser, signinUserWithGoogle, signupUserWithGoogle, signOutUser
    }}>
      {children}
    </AuthContext.Provider>
  )
};

export const useAuth = () => {
  return useContext(AuthContext);
}
