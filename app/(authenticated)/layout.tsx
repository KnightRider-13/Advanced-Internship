"use client";
import Sidebar from "@/app/components/auth/Sidebar";
import React, { useEffect } from "react";
import Searchbar from "../components/auth/Searchbar";
import LoginModal from "../components/modals/LoginModal";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";
import { login, logout } from "@/redux/authSlice";

interface LayoutProps {
  children: React.ReactNode;
}

export default function AuthenticatedLayout({ children }: LayoutProps) {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(login());
        localStorage.setItem("userId", user.uid);
      } else {
        dispatch(logout());
        localStorage.removeItem("userId");
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  return (
      <div className="wrapper">
        <Searchbar />
        <Sidebar />
        <main>
          <LoginModal />
          {children}
        </main>
      </div>
  );
}
