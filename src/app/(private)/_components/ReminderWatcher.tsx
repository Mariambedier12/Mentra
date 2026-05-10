"use client";

import { useEffect } from "react";
import { toast } from "react-toastify";

import { getTodos } from "../todo/_services/todo.service";

export default function ReminderWatcher() {

  useEffect(() => {

    async function checkTodos() {

      try {

        const data = await getTodos();

        const todos = Array.isArray(data)
          ? data
          : data.data || [];

        const now = new Date();

        const currentHour = now.getHours();

        // ✅ unfinished
        const unfinishedTodos = todos.filter(
          (todo: any) => !todo.isCompleted
        );

        // ✅ today's tasks
        const todayTodos = unfinishedTodos.filter((todo: any) => {

          const todoDate = new Date(todo.dueDate);

          return (
            todoDate.getDate() === now.getDate() &&
            todoDate.getMonth() === now.getMonth() &&
            todoDate.getFullYear() === now.getFullYear()
          );
        });

        // ✅ reminder at 6pm & 10pm
        if (
          (currentHour === 18 || currentHour === 22) &&
          todayTodos.length > 0
        ) {

          toast.info(
            `You still have ${todayTodos.length} unfinished task(s) today 👀`
          );
        }

        // ✅ overdue tasks
        const overdueTodos = unfinishedTodos.filter((todo: any) => {
          return new Date(todo.dueDate) < now;
        });

        if (overdueTodos.length > 0) {

          toast.warning(
            `You have ${overdueTodos.length} overdue task(s)`
          );
        }

        // ✅ motivation
        if (unfinishedTodos.length >= 5) {

          toast.success(
            "Small steps still count 💙"
          );
        }

      } catch (err) {
        console.log(err);
      }
    }

    // أول مرة
    checkTodos();

    // كل 5 دقايق
    const interval = setInterval(checkTodos, 1000 * 60 * 5);

    return () => clearInterval(interval);

  }, []);

  return null;
}