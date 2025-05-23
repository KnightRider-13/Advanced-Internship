"use client";

import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { RiForward10Line, RiReplay10Line } from "react-icons/ri";

interface AudioPlayerProps {
  audioUrl: string | undefined | null;
  bookId: string;
  onComplete?: () => void;
}

const AudioPlayer = ({ audioUrl, bookId, onComplete }: AudioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const progressRef = useRef<HTMLInputElement | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleRewind = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(
        audioRef.current.currentTime - 10,
        0
      );
    }
  };
  const handleForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(
        audioRef.current.currentTime + 10,
        audioRef.current.duration
      );
    }
  };

  const markAsFinished = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        throw new Error("User is not signed in.");
      }

      const db = getFirestore();
    const userRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      throw new Error("User document does not exist.");
    }
    const data = userDoc.data();
    const favorites = data.favorites || [];
    
    const bookIndex = favorites.findIndex((book: any) => book.bookId === bookId);
    if (bookIndex === -1) {
      throw new Error("Book not found in favorites.");
    }
    favorites[bookIndex].status = "finished";
    await updateDoc(userRef, { favorites });

    } catch (error) {
      console.error("Error updating book status:", error);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    const handleLoadedMetadata = () => {
      setDuration(audio?.duration || 0);
    };

    const handleTimeUpdate = () => {
      if (audio && progressRef.current) {
        setCurrentTime(audio.currentTime);
        if (duration > 0) {
          progressRef.current.value = String((audio.currentTime / duration) * 100);
        }
      }
    };
    const handleAudioEnded = () => {
      if (onComplete) {
        onComplete();
      }
      markAsFinished();
    };

    if (audio) {
      audio.addEventListener("loadedmetadata", handleLoadedMetadata);
      audio.addEventListener("timeupdate", handleTimeUpdate);
      audio.addEventListener("ended", handleAudioEnded);
    }

    return () => {
      if (audio) {
        audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
        audio.removeEventListener("timeupdate", handleTimeUpdate);
        audio.addEventListener("ended", handleAudioEnded);
      }
    };
  }, [duration, onComplete]);

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      audioRef.current.currentTime =
        (parseFloat(e.target.value) / 100) * audioRef.current.duration;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <>
      <div className="audio__controls--wrapper">
          <div className="audio__controls">
            <button
              className="audio__controls--btn audio_btn-control"
              onClick={handleRewind}
            >
              <RiReplay10Line />
            </button>
            <button
              className="audio__controls--btn audio__controls--btn-play"
              onClick={handlePlayPause}
            >
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
            <button
              className="audio__controls--btn audio_btn-control"
              onClick={handleForward}
            >
              <RiForward10Line />
            </button>
          </div>
        </div>
        <div className="audio__progress--wrapper">
          <div className="audio__time">{formatTime(currentTime)}</div>
          <input
            type="range"
            className="audio__progress--bar"
            ref={progressRef}
            value={duration > 0 ? String((currentTime / duration) * 100) : 0}
            onChange={handleProgressChange}
          />
          <div className="audio__time">{formatTime(duration)}</div>
        </div>
      <audio ref={audioRef} src={audioUrl || ""} />
    </>
  );
};

export default AudioPlayer;
