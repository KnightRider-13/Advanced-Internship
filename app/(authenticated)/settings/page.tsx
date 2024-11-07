"use client"
import Login from "@/app/components/Login";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

export default function Settings() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  return (
    <div className="row">
      {isAuthenticated ? (
        <>
          <div className="section__title page__title">Settings</div>
          <div className="setting__content">
            <div className="settings__sub--title">Your Subscription plan</div>
            <div className="settings__text">Premium-Plus</div>
          </div>
          <div className="setting__content">
            <div className="settings__sub--title">Email</div>
            <div className="settings__text">hanna@gmail.com</div>
          </div>
          <div className="setting__content"></div>
        </>
      ) : (
        <>
        <div className="section__title page__title">Settings</div>
        <Login />
        </>
      )}
    </div>
  );
}
