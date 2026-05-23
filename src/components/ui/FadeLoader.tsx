"use client";

import { FadeLoader as ReactFadeLoader } from "react-spinners";

interface FadeLoaderProps {
  color?: string;
  className?: string;
}

export default function FadeLoader({ color = "#091A58", className = "" }: FadeLoaderProps) {
  return (
    <div className={`flex items-center justify-center p-4 min-h-[100px] w-full ${className}`}>
      <ReactFadeLoader color={color} />
    </div>
  );
}
