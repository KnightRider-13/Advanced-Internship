"use client";

import { useRef } from "react";
import { FaPlay } from "react-icons/fa";

interface AudioPlayerProps {
  audioUrl: string | undefined | null;
}

const AudioPlayer = ({ audioUrl }: AudioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlayAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  return (
    <>
      <audio ref={audioRef} src={audioUrl || ""} />
      <button className="selected__book--icon-play" onClick={handlePlayAudio}>
        <FaPlay />
      </button>
    </>
  );
};

export default AudioPlayer;