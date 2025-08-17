import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { user, login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      await login(form.email, form.password);
    } catch (e) {
      setMsg(e.response?.data?.message || "Login failed");
    }
  };

  if (user)
    return (
      <p className="text-green-600 font-semibold">
        ✅ Logged in as {user.name}
      </p>
    );

  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <form
        onSubmit={onSubmit}
        className="bg-white shadow-md rounded-lg p-6 w-80 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-blue-600">
          Teacher Login
        </h2>
        <input
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
        {msg && <p className="text-red-500 text-sm">{msg}</p>}
        <p className="text-xs text-gray-500">
          💡 First time? Register a teacher via API.
        </p>
      </form>
    </div>
  );
}
