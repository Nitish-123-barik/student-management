import { useEffect, useState } from "react";
import api from "../api";

export default function Students() {
  const [list, setList] = useState([]);
  const [q, setQ] = useState("");
  const [form, setForm] = useState({
    name: "",
    rollNo: "",
    department: "CSE",
    year: 1,
    email: "",
    phone: "",
  });
  const [editingId, setEditingId] = useState(null);

  const load = async () => {
    const { data } = await api.get("/students", { params: { q } });
    setList(data.data);
  };
  useEffect(() => {
    load();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await api.put(`/students/${editingId}`, form);
      setEditingId(null);
    } else {
      await api.post("/students", form);
    }
    setForm({
      name: "",
      rollNo: "",
      department: "CSE",
      year: 1,
      email: "",
      phone: "",
    });
    load();
  };

  const edit = (s) => {
    setEditingId(s._id);
    setForm({
      name: s.name,
      rollNo: s.rollNo,
      department: s.department,
      year: s.year,
      email: s.email,
      phone: s.phone,
    });
  };
  const del = async (id) => {
    if (confirm("Delete this student?")) {
      await api.delete(`/students/${id}`);
      load();
    }
  };

  return (
    <div className="space-y-8">
      {/* Search */}
      <div className="flex gap-2">
        <input
          className="flex-1 border px-3 py-2 rounded"
          placeholder="🔍 Search..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <button
          onClick={load}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      {/* Form */}
      <form
        onSubmit={submit}
        className="bg-white shadow rounded p-4 grid grid-cols-2 gap-4"
      >
        <h3 className="col-span-2 text-lg font-semibold text-blue-600">
          {editingId ? "✏️ Edit Student" : "➕ Add Student"}
        </h3>
        <input
          className="border p-2 rounded"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="border p-2 rounded"
          placeholder="Roll No"
          value={form.rollNo}
          onChange={(e) => setForm({ ...form, rollNo: e.target.value })}
        />
        <input
          className="border p-2 rounded"
          placeholder="Department"
          value={form.department}
          onChange={(e) => setForm({ ...form, department: e.target.value })}
        />
        <input
          className="border p-2 rounded"
          type="number"
          placeholder="Year"
          value={form.year}
          onChange={(e) => setForm({ ...form, year: +e.target.value })}
        />
        <input
          className="border p-2 rounded"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          className="border p-2 rounded"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <div className="col-span-2 flex gap-2">
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            {editingId ? "Update" : "Create"}
          </button>
          {editingId && (
            <button
              type="button"
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              onClick={() => {
                setEditingId(null);
                setForm({
                  name: "",
                  rollNo: "",
                  department: "CSE",
                  year: 1,
                  email: "",
                  phone: "",
                });
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200 text-sm">
          <thead className="bg-blue-100">
            <tr>
              <th className="border px-3 py-2">Name</th>
              <th className="border px-3 py-2">Roll</th>
              <th className="border px-3 py-2">Dept</th>
              <th className="border px-3 py-2">Year</th>
              <th className="border px-3 py-2">Email</th>
              <th className="border px-3 py-2">Phone</th>
              <th className="border px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.map((s) => (
              <tr key={s._id} className="hover:bg-gray-50">
                <td className="border px-3 py-2">{s.name}</td>
                <td className="border px-3 py-2">{s.rollNo}</td>
                <td className="border px-3 py-2">{s.department}</td>
                <td className="border px-3 py-2">{s.year}</td>
                <td className="border px-3 py-2">{s.email}</td>
                <td className="border px-3 py-2">{s.phone}</td>
                <td className="border px-3 py-2 space-x-2">
                  <button
                    onClick={() => edit(s)}
                    className="bg-yellow-400 px-2 py-1 rounded hover:bg-yellow-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => del(s._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {!list.length && (
              <tr>
                <td colSpan="7" className="text-center text-gray-500 py-3">
                  No students found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
