"use client";

import { useEffect, useRef, useState } from "react";

interface DurationProps {
  audioUrl: string | undefined | null;
}

export default function Duration({ audioUrl }: DurationProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [duration, setDuration] = useState(0);
  useEffect(() => {
    if (audioUrl) {
      const audio = audioRef.current;
      const handleLoadedMetadata = () => {
        setDuration(audio?.duration || 0);
      };

      if (audio) {
        audio.src = audioUrl;

        audio.addEventListener("loadedmetadata", handleLoadedMetadata);

        return () => {
          audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
        };
      }
    }
  }, [audioUrl]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };
  return (
    <>
      <audio ref={audioRef} />
      {duration !== null ? (
        <span>{formatTime(duration)}</span>
      ) : (
        <span>Loading...</span>
      )}
    </>
  );
}
