"use client";
import Login from "@/app/components/auth/Login";
import { setPremiumStatus } from "@/redux/authSlice";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Settings() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const email = useSelector((state: RootState) => state.user.email);
  const subscriptionStatus = useSelector((state: RootState) => state.auth.premiumStatus);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated && email) {
      setLoading(false);
  }
  }, [isAuthenticated]);

  const handleUpgradeClick = () => {
    router.push("/choose-plan");
  };

  return (
    <div className="container">
      <div className="row">
        {isAuthenticated ? (
          <>
            <div className="section__title page__title">Settings</div>
            <div className="setting__content">
              <div className="settings__sub--title">Your Subscription plan</div>
              {loading ? (
                <div className="skeleton skeleton__text"></div>
              ) : (
                <>
                  <div className="settings__text">
                    {subscriptionStatus === "" ? "Basic" : subscriptionStatus}
                  </div>

                  {subscriptionStatus === "" && (
                    <button className="btn btn-primary btn__premium" onClick={handleUpgradeClick}>
                      Upgrade to Premium
                    </button>
                  )}
                </>
              )}
            </div>
            <div className="setting__content">
              <div className="settings__sub--title">Email</div>
              {loading ? (
                <div className="skeleton skeleton__text"></div>
              ) : (
                <div className="settings__text">{email}</div>
              )}
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
    </div>
  );
}
