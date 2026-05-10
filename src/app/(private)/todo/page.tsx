"use client";

import { useEffect, useState } from "react";

import CalendarSection from "./_components/CalendarSection";
import AddTaskForm from "./_components/AddTaskForm";
import TodoList from "./_components/TodoList";

import {
  addTodo,
  deleteTodo,
  getTodos,
  toggleTodo,
} from "./_services/todo.service";

import { Todo } from "./_types/todo";

export default function TodoPage() {

  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  async function fetchTodos() {
    try {

      const data = await getTodos();

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
    fetchTodos();
  }, []);

  async function handleAdd(title: string) {

    try {

      const localDate = new Date(
        selectedDate.getTime() -
        selectedDate.getTimezoneOffset() * 60000
      );

      await addTodo({
        title,
        description: "",
        dueDate: localDate.toLocaleDateString("sv-SE"),
      });

      await fetchTodos();

    } catch (err) {
      console.log(err);
    }
  }

  async function handleToggle(id: string) {
    try {

      await toggleTodo(Number(id));
      await fetchTodos();

    } catch (err) {
      console.log(err);
    }
  }

  async function handleDelete(id: string) {
    try {

      await deleteTodo(Number(id));
      await fetchTodos();

    } catch (err) {
      console.log(err);
    }
  }

  return (

    <div className="bg-[#FAF9F7] min-h-screen pt-32 px-6 pb-10">

      <div className="max-w-5xl mx-auto">

        {/* MAIN CARD */}
        <div
          className="
            overflow-hidden
            rounded-[32px]
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
                todos={todos}
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