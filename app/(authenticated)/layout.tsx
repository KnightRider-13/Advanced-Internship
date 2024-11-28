"use client";
import Sidebar from "@/app/components/auth/Sidebar";
import React, { useEffect, useState } from "react";
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
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

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

  const handleSidebarToggle = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <main>
      <div className="wrapper">
        <Searchbar onMenuClick={handleSidebarToggle} />
        <div
          className={`sidebar__overlay ${
            isSidebarOpen ? "" : "sidebar__overlay--hidden"
          }`}
          onClick={handleSidebarToggle}
        ></div>
        <Sidebar isOpen={isSidebarOpen} />
        <LoginModal />
        {children}
      </div>
    </main>
  );
}
