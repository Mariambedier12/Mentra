"use client";

import { useState } from "react";
import Image from "next/image";

import addtask from "@/assets/addtask.png";

interface Props {
  onAdd: (title: string) => void;
}

export default function AddTaskForm({ onAdd }: Props) {

  const [title, setTitle] = useState("");

  return (

    <div className="mb-8">

      {/* INPUT CONTAINER */}
      <div className="relative w-full">

        {/* ICON */}
        <Image
          src={addtask}
          alt="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-60"
        />

        {/* INPUT */}
        <input
          type="text"
          placeholder="Add a new task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="
            w-full
            h-[56px]
            bg-[#F3F4F3]
            rounded-2xl
            pl-11
            pr-32
            text-sm
            outline-none
            placeholder:text-[#8E8E93]
          "
        />

        {/* BUTTON */}
        <button
          onClick={() => {
            if (!title.trim()) return;

            onAdd(title);
            setTitle("");
          }}
          className="
            absolute
            right-2
            top-1/2
            -translate-y-1/2
            bg-[#091A58]
            text-white
            px-5
            h-[42px]
            rounded-xl
            text-sm
            font-medium
            cursor-pointer
            hover:opacity-90
            transition
          "
        >
          Add Task
        </button>

      </div>

    </div>
  );
}