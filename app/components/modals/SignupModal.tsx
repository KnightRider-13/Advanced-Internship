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
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignup() {
    if (!email) {
      setError("Email is required.");
      return;
    }
    if (!password) {
      setError("Password is required.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredentials.user;
      dispatch(
        setUser({
          username: user.email?.split("@")[0],
          email: user.email,
          uid: user.uid,
        })
      );
      router.push("/for-you");
      dispatch(closeSignupModal());
    } catch (error) {
      const errorMessage = (error as Error).message;
      if (errorMessage.includes("invalid-email")) {
        setError("Invalid email address.");
      } else if (errorMessage.includes("email-already-in-use")) {
        setError("Email is already registered.");
      } else {
        setError("Sign-up failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleSignIn() {
    setError("");
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      dispatch(
        setUser({
          username: user.email?.split("@")[0],
          email: user.email,
          uid: user.uid,
        })
      );
      router.push("/for-you");
      dispatch(closeSignupModal());
    } catch (error) {
      const errorMessage = (error as Error).message;
      setError(
        errorMessage.includes("popup-closed-by-user")
          ? "Google sign-in was canceled."
          : "Google sign-in failed. Please try again."
      );
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) return;
      dispatch(
        setUser({
          username: currentUser.email?.split("@")[0],
          email: currentUser.email,
          uid: currentUser.uid,
        })
      );
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
            {error && <div className="error-message">{error}</div>}
            <button
              className="btn button__signup--google"
              onClick={handleGoogleSignIn}
              disabled={loading}
            >
              <figure className="modal__icon modal__icon--google">
                <FcGoogle />
              </figure>
              <div>{loading ? "Signing up..." : "Sign up with Google"}</div>
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
              <button onClick={handleSignup} className="btn" disabled={loading}>
                {loading ? "Signing up..." : "Sign up"}
              </button>
            </div>
          </div>
          <button
            onClick={() => dispatch(openLoginModal())}
            className="auth__switch--btn"
          >
            Already have an account
          </button>
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
