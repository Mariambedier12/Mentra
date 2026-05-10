"use client";

import { Todo } from "../_types/todo";

interface Props {
  todo: Todo;
  onToggle: () => void;
  onDelete: () => void;
}

export default function TodoItem({
  todo,
  onToggle,
  onDelete,
}: Props) {
  return (

    <div
      className={`
        bg-[#F9F9F8]
        rounded-2xl
        px-5
        py-4
        flex
        items-center
        justify-between
        mb-4
        transition

        ${todo.isCompleted ? "opacity-50" : ""}
      `}
    >

      <div className="flex items-center gap-4">

        {/* CHECKBOX */}
        <button
          onClick={onToggle}
          className={`
            w-5
            h-5
            rounded-full
            border
            flex
            items-center
            justify-center
            cursor-pointer
            transition

            ${todo.isCompleted
              ? "bg-[#091A58] border-[#091A58]"
              : "border-[#091A58]"
            }
          `}
        >

          {todo.isCompleted && (
            <span className="text-white text-[10px]">✓</span>
          )}

        </button>

        {/* TEXT */}
        <div>

          <h3
            className={`
              text-sm
              font-medium
              text-[#1E1E1E]

              ${todo.isCompleted
                ? "line-through text-gray-400"
                : ""
              }
            `}
          >
            {todo.title}
          </h3>

          <p className="text-xs text-[#8E8E93] mt-1">
            {new Date(todo.dueDate).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
            })}
          </p>

        </div>

      </div>

      {/* DELETE */}
      <button
        onClick={onDelete}
        className="text-red-400 text-xl font-bold cursor-pointer hover:scale-110 transition"
      >
        🗑
      </button>

    </div>
  );
}