"use client";

import { useState, useEffect, useRef } from "react";
import { CloudRain, Volume2, Wind, Flower } from "lucide-react";

interface SoundItem {
  id: string;
  name: string;
  file: string;
  icon: any;
}

const SOUNDS: SoundItem[] = [
  { id: "rain", name: "Rain", file: "/sounds/relaxing-rain.mp3", icon: CloudRain },
  { id: "white noise", name: "White Noise", file: "/sounds/white-noise-378857.mp3", icon: Volume2 },
  { id: "ambient", name: "Ambient", file: "/sounds/Walen - Dark Heart .mp3", icon: Wind },
  { id: "wallflower", name: "Wallflower", file: "/sounds/Epic Spectrum - Wallflower.mp3", icon: Flower },
];

export default function FocusSounds() {
  const [enabled, setEnabled] = useState<boolean>(true);
  const [selectedSound, setSelectedSound] = useState<string>("ambient");
  const [previewingId, setPreviewingId] = useState<string | null>(null);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Load from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedEnabled = localStorage.getItem("focus-sound-enabled");
      if (storedEnabled !== null) {
        setEnabled(storedEnabled === "true");
      }
      
      const storedSelected = localStorage.getItem("focus-sound-selected");
      if (storedSelected !== null) {
        setSelectedSound(storedSelected);
      }
    }
  }, []);

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const handleToggle = () => {
    const nextVal = !enabled;
    setEnabled(nextVal);
    localStorage.setItem("focus-sound-enabled", nextVal.toString());

    // If disabled, pause any playing preview
    if (!nextVal && audioRef.current) {
      audioRef.current.pause();
      setPreviewingId(null);
    }
  };

  const handleSelectSound = (id: string) => {
    if (!enabled) return;
    setSelectedSound(id);
    localStorage.setItem("focus-sound-selected", id);
  };

  const handlePlayPreview = (sound: SoundItem, e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid triggering selection row click
    if (!enabled) return;

    if (previewingId === sound.id) {
      // Pause if clicked again
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setPreviewingId(null);
    } else {
      // Pause current
      if (audioRef.current) {
        audioRef.current.pause();
      }
      
      // Play new
      audioRef.current = new Audio(sound.file);
      audioRef.current.loop = true;
      audioRef.current.play().catch(err => {
        console.error("Audio preview failed:", err);
      });
      setPreviewingId(sound.id);
    }
  };

  return (
    <div className="space-y-6 w-full">
      {/* TOGGLE CARD */}
      <div className="bg-white rounded-[20px] p-6 shadow-sm border border-[#F1F1F1] flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#091A58] mb-1">Focus Sounds</h2>
          <p className="text-[#6B7280] text-sm">
            Audio feedback for key study interactions
          </p>
        </div>
        
        {/* Toggle Switch */}
        <button
          onClick={handleToggle}
          className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
            enabled ? "bg-[#091A58]" : "bg-gray-300"
          }`}
        >
          <div
            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
              enabled ? "translate-x-6" : "translate-x-0"
            }`}
          />
        </button>
      </div>

      {/* ENVIRONMENT SOUNDS CARD */}
      <div className={`bg-white rounded-[20px] shadow-sm border border-[#F1F1F1] overflow-hidden transition-opacity duration-300 ${
        enabled ? "opacity-100" : "opacity-50 pointer-events-none"
      }`}>
        <div className="p-6 border-b border-[#F1F1F1]">
          <h2 className="text-xl font-bold text-[#091A58] mb-1">Environment Sounds</h2>
          <p className="text-[#6B7280] text-sm">
            Ambient backgrounds to drown out distractions
          </p>
        </div>

        <div className="divide-y divide-[#F8F8F8]">
          {SOUNDS.map((sound) => {
            const isSelected = selectedSound === sound.id;
            const Icon = sound.icon;
            return (
              <div
                key={sound.id}
                onClick={() => handleSelectSound(sound.id)}
                className={`flex items-center justify-between p-5 cursor-pointer transition-all ${
                  isSelected ? "bg-[#EBF0FF]" : "hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-4">
                  {/* Sound Icon */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isSelected ? "bg-[#091A58] text-white" : "bg-gray-100 text-gray-500"
                  }`}>
                    <Icon size={20} />
                  </div>

                  {/* Sound Name */}
                  <span className={`text-[16px] font-semibold ${
                    isSelected ? "text-[#091A58] font-bold" : "text-gray-700"
                  }`}>
                    {sound.name}
                  </span>
                </div>

                <div className="flex items-center gap-6">
                  {/* Play Preview Button */}
                  <button
                    onClick={(e) => handlePlayPreview(sound, e)}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                      previewingId === sound.id
                        ? "bg-[#091A58] text-white border-[#091A58]"
                        : "text-[#091A58] border-[#091A58] bg-transparent hover:bg-[#091A58]/5"
                    }`}
                  >
                    {previewingId === sound.id ? "Pause Preview" : "Play Preview"}
                  </button>

                  {/* Custom Radio Button */}
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    isSelected ? "border-[#091A58]" : "border-gray-300"
                  }`}>
                    {isSelected && (
                      <div className="w-2.5 h-2.5 rounded-full bg-[#091A58]" />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
