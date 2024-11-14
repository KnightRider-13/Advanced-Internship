"use client";

import { logout } from "@/redux/authSlice";
import { openLoginModal } from "@/redux/modalSlice";
import { RootState } from "@/redux/store";
import { signOutUser } from "@/redux/userSlice";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BsPen } from "react-icons/bs";
import { CiBookmark, CiSearch, CiSettings } from "react-icons/ci";
import { FiHelpCircle, FiLogOut } from "react-icons/fi";
import { PiHouseLine } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";

export default function Sidebar() {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const [activeLink, setActiveLink] = useState<string>("for-you");
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const handleLinkClick = (link: string): void => {
    setActiveLink(link);
  };

  useEffect(() => {
    if (pathname.includes("/for-you")) {
      setActiveLink("for-you");
    } else if (pathname.includes("/library")) {
      setActiveLink("library");
    } else if (pathname.includes("/settings")) {
      setActiveLink("settings");
    } else if (pathname.includes("/logout")) {
      setActiveLink("logout");
    }
  }, [pathname]);

  return (
    <>
      <div className="sidebar sidebar--closed">
        <div className="sidebar__logo">
          <img src="/assets/logo.png" />
        </div>
        <div className="sidebar__wapper">
          <div className="sidebar__top">
            <Link
              className="sidebar__link--wrapper"
              href={"/for-you"}
              onClick={() => handleLinkClick("for-you")}
            >
              <div
                className={`sidebar__link--line ${
                  activeLink === "for-you" ? "active--tab" : ""
                }`}
              ></div>
              <div className="sidebar__icon--wrapper">
                <PiHouseLine className="sidebar__icon" />
              </div>
              <div className="sidebar__link--text">For you</div>
            </Link>
            <Link
              className="sidebar__link--wrapper"
              href={"/library"}
              onClick={() => handleLinkClick("library")}
            >
              <div
                className={`sidebar__link--line ${
                  activeLink === "library" ? "active--tab" : ""
                }`}
              ></div>
              <div className="sidebar__icon--wrapper">
                <CiBookmark className="sidebar__icon" />
              </div>
              <div className="sidebar__link--text">My Library</div>
            </Link>
            <div className="sidebar__link--wrapper sidebar__link--not-allowed">
              <div className="sidebar__link--line "></div>
              <div className="sidebar__icon--wrapper">
                <BsPen className="sidebar__icon" />
              </div>
              <div className="sidebar__link--text">Highlights</div>
            </div>
            <div className="sidebar__link--wrapper sidebar__link--not-allowed">
              <div className="sidebar__link--line "></div>
              <div className="sidebar__icon--wrapper">
                <CiSearch className="sidebar__icon" />
              </div>
              <div className="sidebar__link--text">Search</div>
            </div>
          </div>
          <div className="sidebar__bottom">
            <Link
              className="sidebar__link--wrapper"
              href={"/settings"}
              onClick={() => handleLinkClick("settings")}
            >
              <div
                className={`sidebar__link--line ${
                  activeLink === "settings" ? "active--tab" : ""
                }`}
              ></div>
              <div className="sidebar__icon--wrapper">
                <CiSettings className="sidebar__icon" />
              </div>
              <div className="sidebar__link--text">Settings</div>
            </Link>
            <div className="sidebar__link--wrapper sidebar__link--not-allowed">
              <div className="sidebar__link--line "></div>
              <div className="sidebar__icon--wrapper">
                <FiHelpCircle className="sidebar__icon" />
              </div>
              <div className="sidebar__link--text">Help & Support</div>
            </div>
            {isAuthenticated ? (
              <Link
                className="sidebar__link--wrapper"
                href={"/logout"}
                onClick={() => {
                  handleLinkClick("logout");
                  dispatch(signOutUser());
                  dispatch(logout());
                }}
              >
                <div
                  className={`sidebar__link--line ${
                    activeLink === "logout" ? "active--tab" : ""
                  }`}
                ></div>
                <div className="sidebar__icon--wrapper">
                  <FiLogOut className="sidebar__icon" />
                </div>
                <div className="sidebar__link--text">Logout</div>
              </Link>
            ) : (
              <Link
                className="sidebar__link--wrapper"
                href={"/logout"}
                onClick={() => dispatch(openLoginModal())}
              >
                <div
                  className={`sidebar__link--line ${
                    activeLink === "logout" ? "active--tab" : ""
                  }`}
                ></div>
                <div className="sidebar__icon--wrapper">
                  <FiLogOut className="sidebar__icon" />
                </div>
                <div className="sidebar__link--text">Login</div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
