"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openLoginModal } from "@/redux/modalSlice";
import { FaBookmark, FaReadme } from "react-icons/fa";
import { CiBookmark, CiMicrophoneOn } from "react-icons/ci";
import { useRouter } from "next/navigation";
import {
  arrayUnion,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/firebase";
import { RootState } from "@/redux/store";
import { getAuth } from "firebase/auth";

interface BookActionsProps {
  data: any;
}

const BookActions: React.FC<BookActionsProps> = ({ data }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [bookStatus, setBookStatus] = useState<string | null>(null);
  const auth = getAuth();
  const userId = auth.currentUser?.uid;

  const getSubscriptionStatus = async (userId: string) => {
    try {
      const userDocRef = doc(db, "users", userId);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setIsSubscribed(userData.isSubscribed);
      }
    } catch (error) {
      console.error("Error fetching user subscription status:", error);
      setIsSubscribed(false);
    }
  };
  const getFavoritesStatus = async () => {
    if (!userId) return;
    try {
      const userDocRef = doc(db, "users", userId);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const favorites = userData.favorites || [];
        const isInFavorites = favorites.some(
          (book: any) => book.bookId === data.id
        );
        setIsFavorite(isInFavorites);
        const favoriteBook = favorites.find(
          (book: any) => book.bookId === data.id
        );
        if (favoriteBook) {
          setBookStatus(favoriteBook.status || "saved"); // Default to 'saved' if no status
        }
      }
    } catch (error) {
      console.error("Error fetching favorites status:", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated && userId) {
      getSubscriptionStatus(userId);
      getFavoritesStatus();
    }
  }, [isAuthenticated, userId]);

  const addToFavorites = async () => {
    try {
      if (!userId) {
        console.error("User ID is not available.");
        return;
      }

      const userDocRef = doc(db, "users", userId);
      const bookData = {
        bookId: data.id,
        title: data.title,
        author: data.author,
        subTitle: data.subTitle,
        imageLink: data.imageLink,
        audioLink: data.audioLink,
        averageRating: data.averageRating,
        subscriptionRequired: data.subscriptionRequired,
        status: "saved",
      };

      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const favorites = Array.isArray(userData?.favorites)
          ? userData.favorites
          : [];
        const isAlreadyFavorite = favorites.some(
          (book: any) => book.bookId === data.id
        );
        if (isAlreadyFavorite) {
          console.log("This book is already in your favorites.");
          return;
        }
        await updateDoc(userDocRef, {
          favorites: arrayUnion(bookData),
        });
        setIsFavorite(true);
        setBookStatus("saved");
      } else {
        await setDoc(userDocRef, { favorites: [bookData] });
        setIsFavorite(true);
        setBookStatus("saved");
      }
    } catch (error) {
      console.error("Error adding book to favorites:", error);
    }
  };

  const markAsFinished = async () => {
    if (!userId) {
      console.error("User ID is not available.");
      return;
    }

    const userDocRef = doc(db, "users", userId);

    try {
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const updatedFavorites = [...userData.favorites].map((book: any) =>
          book.bookId === data.id ? { ...book, status: "finished" } : book
        );

        await updateDoc(userDocRef, {
          favorites: updatedFavorites,
        });
        setIsFavorite(true);
        setBookStatus("finished");
      }
    } catch (error) {
      console.error("Error marking book as finished:", error);
    }
  };

  const markAsSaved = async () => {
    if (!userId) {
      console.error("User ID is not available.");
      return;
    }

    const userDocRef = doc(db, "users", userId);

    try {
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const updatedFavorites = [...userData.favorites].map((book: any) =>
          book.bookId === data.id ? { ...book, status: "saved" } : book
        );

        await updateDoc(userDocRef, {
          favorites: updatedFavorites,
        });
        setBookStatus("saved");
      }
    } catch (error) {
      console.error("Error marking book as saved:", error);
    }
  };

  const removeFromFavorites = async () => {
    if (!userId) {
      console.error("User ID is not available.");
      return;
    }
  
    const userDocRef = doc(db, "users", userId);
  
    try {
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const favorites = userData.favorites || [];
  
        const updatedFavorites = favorites.filter(
          (book: any) => book.bookId !== data.id
        );
  
        await updateDoc(userDocRef, { favorites: updatedFavorites });
        setIsFavorite(false);
      }
    } catch (error) {
      console.error("Error removing book from favorites:", error);
    }
  };

  const handleActionClick = (
    action: "read" | "listen" | "addToLibrary" | "finish" | "save"
  ) => {
    if (!isAuthenticated) {
      dispatch(openLoginModal());
    } else {
      if (action === "read" || action === "listen") {
        if (data.subscriptionRequired && !data.isSubscribed) {
          router.push("/choose-plan");
        } else {
          router.push(`/player/${data.id}`);
        }
      } else if (action === "addToLibrary") {
        if (isFavorite) {
          removeFromFavorites();
        } else {
          addToFavorites();
        }
      } else if (action === "finish") {
        markAsFinished();
      } else if (action === "save") {
        markAsSaved();
      }
    }
  };

  return (
    <>
      <div className="inner-book__read--btn-wrapper">
        <button
          className="inner-book__read--btn"
          onClick={() => handleActionClick("read")}
        >
          <div className="inner-book__read--icon">
            <FaReadme />
          </div>
          <div className="inner-book__read--text">Read</div>
        </button>
        <button
          className="inner-book__read--btn"
          onClick={() => handleActionClick("listen")}
        >
          <div className="inner-book__read--icon">
            <CiMicrophoneOn />
          </div>
          <div className="inner-book__read--text">Listen</div>
        </button>
      </div>
      <div className="inner-book__bookmark">
        {isFavorite ? (
          <>
            <div className="inner-book__bookmark--icon">
              <FaBookmark />
            </div>
            <div
              className="inner-book__bookmark--text"
              onClick={() => handleActionClick("addToLibrary")}
            >
              Saved in My Library
            </div>
            {bookStatus === "saved" ? (
              <button
                className="btn btn--finished"
                onClick={() => handleActionClick("finish")}
              >
                Mark as Finished
              </button>
            ) : (
              <button
                className="btn btn--finished"
                onClick={() => handleActionClick("save")}
              >
                Mark as Saved
              </button>
            )}
          </>
        ) : (
          <>
            <div className="inner-book__bookmark--icon">
              <CiBookmark />
            </div>
            <div
              className="inner-book__bookmark--text"
              onClick={() => handleActionClick("addToLibrary")}
            >
              Add title to My Library
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default BookActions;
