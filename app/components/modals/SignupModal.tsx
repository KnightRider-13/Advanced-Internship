"use client";

import { closeSignupModal, openLoginModal } from "@/redux/modalSlice";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { auth, provider } from "@/firebase";
import { FcGoogle } from "react-icons/fc";
import { RxCross1 } from "react-icons/rx";
import { setUser } from "@/redux/userSlice";
import { useRouter } from "next/navigation";

export default function SignupModal() {
  const isOpen = useSelector((state: RootState) => state.modal.signUpModalOpen);
  const dispatch = useDispatch();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignup() {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    router.push("/for-you");
    const user = userCredentials.user;
    dispatch(
      setUser({
        username: user.email?.split("@")[0],
        email: user.email,
        uid: user.uid,
      })
    );
  }

  async function handleGoogleSignIn(){
    try{
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      router.push("/for-you");
    } catch(error){
      alert("Google sign in failed: " + (error as Error).message);
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) return;
      dispatch(setUser({
        username: currentUser.email?.split("@")[0],
        email: currentUser.email,
        uid: currentUser.uid
      }))
    });
    return unsubscribe;
  }, [dispatch]);
  return (
    <>
      <Modal
        open={isOpen}
        onClose={() => dispatch(closeSignupModal())}
        className="modal"
      >
        <div className="modal__content">
          <div className="auth__content">
            <div className="auth__title">Sign up to Summarist</div>
            <button className="btn button__signup--google" onClick={handleGoogleSignIn}>
              <figure className="modal__icon modal__icon--google">
                <FcGoogle />
              </figure>
              <div>Sign up with Google</div>
            </button>
            <div className="auth__seperator">
              <span className="auth__separator--text">or</span>
            </div>
            <div className="auth__main--form">
              <input
                className="modal__input"
                type={"email"}
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="modal__input"
                type={"password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button onClick={handleSignup} className="btn">
                Sign up
              </button>
            </div>
          </div>
          <button
            onClick={() => dispatch(openLoginModal())}
            className="auth__switch--btn"
          >Already have an account</button>
          <div
            className="auth__close--btn"
            onClick={() => dispatch(closeSignupModal())}
          >
            <RxCross1 />
          </div>
        </div>
      </Modal>
    </>
  );
}
