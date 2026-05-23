const BASE_URL = "http://mentraa.runasp.net/api/Todo";

/**
 * GET TODOS
 */
export async function getTodos(token: string) {
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
export async function addTodo(
  data: {
    title: string;
    description: string;
    dueDate: string;
  },
  token: string
) {
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
export async function toggleTodo(id: number, token: string) {
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
export async function deleteTodo(id: number, token: string) {
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

/**
 * GET TOMORROW REMINDER
 */
export async function getTomorrowReminder(token: string) {
  const res = await fetch(`${BASE_URL}/tomorrow-reminder`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch tomorrow reminders");

  return res.json();
}