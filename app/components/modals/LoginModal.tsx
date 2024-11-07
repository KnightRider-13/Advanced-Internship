"use client";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  closeLoginModal,
  openSignupModal,
} from "@/redux/modalSlice";
import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/firebase";
import { FaUser } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { RxCross1 } from "react-icons/rx";
import { usePathname, useRouter } from "next/navigation";
import { login } from "@/redux/authSlice";

export default function LoginModal() {
  const isOpen = useSelector((state: RootState) => state.modal.loginModalOpen);
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loadingGuest, setLoadingGuest] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [loading, setLoading] = useState(false);
  const authenticatedPages = ["/for-you", "/library", "/settings"];

  async function handleSignIn() {
    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      dispatch(login());
      dispatch(closeLoginModal());
      if(!authenticatedPages.includes(pathname)){
        router.push("/for-you");
      }

    } catch (error) {
      alert("Sign-in failed: " + (error as Error).message);
    } finally{
      setLoading(false);
    }
  }

  async function handleGoogleSignIn() {
    setLoadingGoogle(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      dispatch(login());
      dispatch(closeLoginModal());
      if(!authenticatedPages.includes(pathname)){
        router.push("/for-you");
      }
    } catch (error) {
      alert("Google sign-in failed: " + (error as Error).message);
    } finally {
      setLoadingGoogle(false);
    }
  }

  async function handleGuestSignIn() {
    setLoadingGuest(true);
    try {
      await signInWithEmailAndPassword(auth, "guest@gmail.com", "guest123");
      dispatch(login());
      dispatch(closeLoginModal());
      if(!authenticatedPages.includes(pathname)){
        router.push("/for-you");
      }
    } catch (error) {
      alert("Guest sign-in failed: " + (error as Error).message);
    } finally{
      setLoadingGuest(false);
    }
  }

  return (
    <>
      <Modal
        open={isOpen}
        onClose={() => dispatch(closeLoginModal())}
        className="modal"
      >
        <div className="modal__content">
          <div className="auth__content">
            <div className="auth__title">Log in to Summarist</div>
            <button
              disabled={loadingGuest}
              onClick={handleGuestSignIn}
              className="btn button__signup--guest"
            >
              <div className="modal__icon modal__icon--guest">
                <FaUser />
              </div>
              <div>{loadingGuest ? "Signing In..." : "Sign in as Guest"}</div>
            </button>
            <div className="auth__seperator">
              <span className="auth__separator--text">or</span>
            </div>
            <button
              disabled={loadingGoogle}
              className="btn button__signup--google"
              onClick={handleGoogleSignIn}
            >
              <figure className="modal__icon modal__icon--google">
                <FcGoogle />
              </figure>
              <div>{loadingGoogle ? "Signing In..." : "Log in with Google"}</div>
            </button>
            <div className="auth__seperator">
              <span className="auth__separator--text">or</span>
            </div>
            <div className="auth__main--form">
              <input
                className="auth__main--input"
                type={"email"}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="auth__main--input"
                type={"password"}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button onClick={handleSignIn} className="btn" disabled={loading}>
              {loading ? "Signing In..." : "Sign In"}
              </button>
            </div>
          </div>
          <div className="auth__forgot--password">Forgot your password?</div>
          <button
            className="auth__switch--btn"
            onClick={() => 
              dispatch(openSignupModal())
            }
          >
            Don't have an account?
          </button>
          <div className="auth__close--btn" onClick={() => dispatch(closeLoginModal())}>
          <RxCross1 />
          </div>
        </div>
      </Modal>
    </>
  );
}
