"use client";

import { openLoginModal } from "@/redux/modalSlice";
import { useDispatch } from "react-redux";

export default function Login() {
    const dispatch = useDispatch();
    
  function handleLogin() {
    dispatch(openLoginModal());
  }

  return (
    <>
      <div className="settings__login--wrapper">
        <img src="/assets/login.png" alt="Login Image" />
        <div className="settings__login--text">
          Log in to your account to see your details.
        </div>
        <button className="btn settings__login--btn" onClick={handleLogin}>
          Login
        </button>
      </div>
    </>
  );
}
