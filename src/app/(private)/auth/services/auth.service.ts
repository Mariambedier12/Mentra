const BASE_URL = "http://mentraa.runasp.net/api/Auth";

/**
 * LOGIN
 */
export async function login(email: string, password: string) {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  return {
    ok: res.ok,
    data,
  };
}

/**
 * REGISTER
 */
export async function register(data: {
  userName: string;
  displayName: string;
  email: string;
  password: string;
  age: number;
}) {
  const res = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  return {
    ok: res.ok,
    data: result,
  };
}

/**
 * EMAIL EXISTS
 */
export async function checkEmailExists(email: string) {
  const res = await fetch(`${BASE_URL}/EmailExists?email=${email}`);
  const data: boolean = await res.json(); // مهم جدًا

  return data;
}