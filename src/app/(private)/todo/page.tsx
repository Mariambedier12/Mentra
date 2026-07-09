"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import CalendarSection from "./_components/CalendarSection";
import AddTaskForm from "./_components/AddTaskForm";
import TodoList from "./_components/TodoList";
import FadeLoader from "@/components/ui/FadeLoader";

import {
  addTodo,
  deleteTodo,
  getTodos,
  toggleTodo,
} from "./_services/todo.service";

import { Todo } from "./_types/todo";

export default function TodoPage() {
  const { data: session, status } = useSession();
  const token = (session?.user as any)?.token;

  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  async function fetchTodos() {
    if (!token) return;
    try {
      const data = await getTodos(token);

      if (Array.isArray(data)) {
        setTodos(data);
      }
      else if (Array.isArray(data.data)) {
        setTodos(data.data);
      }
      else {
        setTodos([]);
      }

    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (status === "authenticated" && token) {
      fetchTodos();
    }
  }, [status, token]);

  async function handleAdd(title: string) {
    if (!token) return;
    try {
      const localDate = new Date(
        selectedDate.getTime() -
        selectedDate.getTimezoneOffset() * 60000
      );

      await addTodo({
        title,
        description: "",
        dueDate: localDate.toLocaleDateString("sv-SE"),
      }, token);

      await fetchTodos();

    } catch (err) {
      console.log(err);
    }
  }

  async function handleToggle(id: string) {
    if (!token) return;
    try {
      await toggleTodo(Number(id), token);
      await fetchTodos();
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDelete(id: string) {
    if (!token) return;
    try {
      await deleteTodo(Number(id), token);
      await fetchTodos();
    } catch (err) {
      console.log(err);
    }
  }

  const selectedDateStr = new Date(
    selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000
  ).toLocaleDateString("sv-SE");

  const filteredTodos = todos.filter((todo) => {
    if (!todo.dueDate) return false;
    return todo.dueDate.substring(0, 10) === selectedDateStr;
  });

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <FadeLoader />
      </div>
    );
  }

  return (
    <div className="pt-32 px-6 pb-10">
      <div className="max-w-[1100px] mx-auto">

        {/* MAIN CARD */}
        <div
          className="
            overflow-hidden
            rounded-[10px]
            bg-white
            shadow-sm
            grid
            grid-cols-1
            lg:grid-cols-[320px_1fr]
            min-h-[700px]
          "
        >

          {/* LEFT */}
          <div className="bg-[#F3F4F3] p-6">
            <CalendarSection
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          </div>

          {/* RIGHT */}
          <div className="bg-white px-8 py-7">

            <h1 className="text-3xl font-bold text-[#1E1E1E] mb-8">
              To Do
            </h1>

            <AddTaskForm onAdd={handleAdd} />

            <div className="mt-6">
              <TodoList
                todos={filteredTodos}
                onToggle={handleToggle}
                onDelete={handleDelete}
              />
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
