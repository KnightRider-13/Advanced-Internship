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
import { IoTextOutline } from "react-icons/io5";
import { PiHouseLine } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";

interface SidebarProps {
  isOpen: boolean;
}

export default function Sidebar({ isOpen }: SidebarProps) {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const [activeLink, setActiveLink] = useState<string>("for-you");
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const isPlayerPage = pathname.includes("/player");
  const [fontSize, setFontSize] = useState<number>(16);
  const fontSizes = [16, 18, 22, 26];
  const activeFontIndex = fontSizes.indexOf(fontSize);

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
    }
  }, [pathname]);

  const handleFontSizeChange = (size: number): void => {
    setFontSize(size);
    const summaryElement = document.querySelector(".audio__book--summary");
    if (summaryElement) {
      (summaryElement as HTMLElement).style.fontSize = `${size}px`;
    }
  };

  return (
    <>
      <div
        className={`sidebar ${
          isOpen ? "sidebar--opened" : "sidebar--closed"
        }`}
      >
        <div className="sidebar__logo">
          <img src="/assets/logo.png" />
        </div>
        <div
          className={`sidebar__wrapper ${
            isPlayerPage ? "sidebar__wrapper--player-active" : ""
          }`}
        >
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
            {/* <Link
              className="sidebar__link--wrapper sidebar__link--not-allowed"
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
            </Link> */}
            <div className="sidebar__link--wrapper sidebar__link--not-allowed">
              <div className="sidebar__link--line "></div>
              <div className="sidebar__icon--wrapper">
                <CiBookmark className="sidebar__icon" />
              </div>
              <div className="sidebar__link--text">My Library</div>
            </div>
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
              <div className="sidebar__link--wrapper sidebar__font--size-wrapper">
                <div className="sidebar__link--text sidebar__font--size-icon siebar__font--size-icon--active"></div>
              </div>
            </div>
            {isPlayerPage && (
          <div className="sidebar__link--wrapper sidebar__font--size-wrapper">
            {fontSizes.map((size, index) => (
              <div
                key={size}
                className={`sidebar__link--text sidebar__font--size-icon ${
                  activeFontIndex === index
                    ? "sidebar__font--size-icon--active"
                    : ""
                }`}
                style={{ fontSize: `${size}px` }}
                onClick={() => handleFontSizeChange(size)}
              >
                <IoTextOutline />
              </div>
            ))}
          </div>
        )}
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
              <button
                className="sidebar__link--wrapper"
                onClick={() => {
                  dispatch(signOutUser());
                  dispatch(logout());
                }}
              >
                <div className="sidebar__link--line"></div>
                <div className="sidebar__icon--wrapper">
                  <FiLogOut className="sidebar__icon" />
                </div>
                <div className="sidebar__link--text">Logout</div>
              </button>
            ) : (
              <button
                className="sidebar__link--wrapper"
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
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
