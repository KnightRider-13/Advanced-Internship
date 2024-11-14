"use client";
import Login from "@/app/components/auth/Login";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function Logout() {
  const router = useRouter();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/settings");
    }
  }, [isAuthenticated, router]);

  return (
    <div className="row">
      <div className="section__title page__title">Settings</div>
      <Login />
    </div>
  );
}
