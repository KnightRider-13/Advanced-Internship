import Sidebar from "@/app/components/Sidebar";
import React from "react";
import Searchbar from "../components/Searchbar";
import LoginModal from "../components/modals/LoginModal";

interface LayoutProps {
  children: React.ReactNode;
}

export default function AuthenticatedLayout({ children }: LayoutProps) {
  return (
    <div className="wrapper">
      <Searchbar />
      <Sidebar />
      <main>
        <LoginModal />
        <div className="container">
          {children}
        </div>
      </main>
    </div>
  );
}
