import { getSession } from "next-auth/react";

const BASE_URL = "http://mentraa.runasp.net/api/Todo";

/**
 * GET TOKEN من NextAuth
 */
async function getToken() {
  const session = await getSession();
  return (session?.user as any)?.token;
}

/**
 * GET TODOS
 */
export async function getTodos() {
  const token = await getToken();

  const res = await fetch(BASE_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
}

/**
 * ADD TODO
 */
export async function addTodo(data: {
  title: string;
  description: string;
  dueDate: string;
}) {
  const token = await getToken();

  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return res.json();
}

/**
 * TOGGLE TODO
 */
export async function toggleTodo(id: number) {
  const token = await getToken();

  const res = await fetch(`${BASE_URL}/${id}/toggle`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      accept: "*/*",
    },
  });

  if (!res.ok) throw new Error("Toggle failed");

  return true;
}

/**
 * DELETE TODO
 */
export async function deleteTodo(id: number) {
  const token = await getToken();

  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      accept: "*/*",
    },
  });

  if (!res.ok) throw new Error("Delete failed");

  return true;
}