"use client";

import { auth } from "@/firebase";
import { closePasswordModal, openLoginModal } from "@/redux/modalSlice";
import { RootState } from "@/redux/store";
import Modal from "@mui/material/Modal";
import { sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";

export default function ForgetPasswordModal() {
  const isOpen = useSelector((state: RootState) => state.modal.passwordModalOpen);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handlePasswordReset(event: React.FormEvent){
    event.preventDefault();
    if(!email){
        alert("Please enter your email address.");
        return;
    }

    setIsLoading(true);
    try{
        await sendPasswordResetEmail(auth, email);
        alert("Password reset email sent! Please check your inbox.");
        dispatch(closePasswordModal());
        dispatch(openLoginModal());
    } catch(error){
        alert("Failed to sent reset email: " + (error as Error).message);
    } finally{
        setIsLoading(false);
    }
  }

  return (
    <>
      <Modal
        className="modal"
        open={isOpen}
        onClose={() => dispatch(closePasswordModal())}
      >
        <div className="modal__content">
            <div className="auth__content">
                <div className="auth__title">Reset your password</div>
                <form className="auth__main--form" onSubmit={handlePasswordReset}>
                <input className="auth__main--input" type="text" placeholder="Email address" onChange={(e) => setEmail(e.target.value)} value={email}/>
                <button className="btn" type="submit" disabled={isLoading}><span>{isLoading ? "Sending..." : "Send reset password link"}</span></button>
                </form>
            </div>
            <button className="auth__switch--btn" onClick={() => {dispatch(openLoginModal()), dispatch(closePasswordModal())}}>Go to login</button>
            <div className="auth__close--btn" onClick={() => dispatch(closePasswordModal())}>
            <RxCross1 />
            </div>
        </div>
      </Modal>
    </>
  );
}
