import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context.jsx/AuthProvider";
import { ThemeContext } from "../Context.jsx/ThemeProvider";

const Journal = () => {
  const { user } = useContext(AuthContext);
  const { darkMode } = useContext(ThemeContext);

  const [blogs, setBlogs] = useState([]);
  const [edit, setEdit] = useState({});
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
  });

  // ✅ FETCH BLOGS
  const getItem = async () => {
    try {
      const res = await fetch("http://localhost:9000/api/blogs");
      const data = await res.json();
      setBlogs(data?.data || []);
    } catch (err) {
      console.error("Fetch error:", err.message);
      setBlogs([]);
    }
  };

  useEffect(() => {
    getItem();
  }, []);

  // ✅ DELETE (ONLY OWNER)
  const handledelete = async (id, ownerId) => {
    if (user?._id !== ownerId) {
      return alert("You can only delete your own blog");
    }

    try {
      await fetch(`http://localhost:9000/api/blogs/${id}`, {
        method: "DELETE",
      });

      setBlogs((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      console.error("Delete error:", err.message);
    }
  };

  // ✅ OPEN EDIT
  const handleOpenEdit = (obj) => {
    if (user?._id !== obj.createdBy?._id) {
      return alert("You can only edit your own blog");
    }

    setEdit(obj);
    setFormData({
      title: obj.title || "",
      category: obj.category || "",
      description: obj.description || "",
    });
    setOpen(true);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ✅ UPDATE
  const handleEdit = async (id, updatedData) => {
    try {
      await fetch(`http://localhost:9000/api/blogs/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
    } catch (err) {
      console.error("Update error:", err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleEdit(edit._id, formData);
    setOpen(false);
    setEdit({});
    getItem();
  };

  return (
    <div className={`min-h-screen p-6 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-black"}`}>

      <h1 className="text-4xl font-bold text-center mb-10 text-purple-600">
        📓 My Journal
      </h1>

      {/* ✅ EMPTY STATE */}
      {blogs.length === 0 ? (
        <div className="text-center mt-20 text-gray-500 text-lg">
          No blogs available ✍️ <br />
          Start writing your first one!
        </div>
      ) : (
        <div className="max-w-4xl mx-auto space-y-6">
          {blogs.map((obj) => {
            const isOwner = user?._id === obj?.createdBy?._id;

            return (
              <div
                key={obj._id}
                className={`p-6 rounded-2xl shadow-md border transition hover:shadow-xl ${
                  darkMode ? "bg-gray-800 border-gray-700" : "bg-white"
                }`}
              >
                {/* DATE BADGE */}
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-gray-400">
                    {obj?.createdAt
                      ? new Date(obj.createdAt).toDateString()
                      : ""}
                  </span>

                  <span className="text-xs bg-purple-600 text-white px-2 py-1 rounded">
                    {obj.category}
                  </span>
                </div>

                {/* TITLE */}
                <h2 className="text-2xl font-bold text-purple-700 mb-2">
                  {obj.title}
                </h2>

                {/* DESCRIPTION */}
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {obj.description}
                </p>

                {/* AUTHOR */}
                <div className="mt-4 text-sm text-right italic text-gray-400">
                  — {obj?.createdBy?.userName || "Unknown"}
                </div>

                {/* ACTIONS */}
                {isOwner && (
                  <div className="mt-4 flex justify-end gap-3">
                    <button
                      onClick={() => handleOpenEdit(obj)}
                      className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handledelete(obj._id, obj.createdBy._id)
                      }
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ✅ FLOATING EDIT MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-full max-w-md shadow-lg">

            <h2 className="text-xl font-bold mb-4 text-purple-600">
              Edit Blog
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Title"
                className="w-full border px-3 py-2 rounded"
              />

              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Category"
                className="w-full border px-3 py-2 rounded"
              />

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                className="w-full border px-3 py-2 rounded"
              />

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 text-white rounded"
                >
                  Save
                </button>
              </div>

            </form>
          </div>

        </div>
      )}
    </div>
  );
};

export default Journal;