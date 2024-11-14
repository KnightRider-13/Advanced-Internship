"use client"
import Login from "@/app/components/auth/Login";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

export default function Library() {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return <div className="row">{isAuthenticated ? <></> : <><Login /></>}</div>;
}
