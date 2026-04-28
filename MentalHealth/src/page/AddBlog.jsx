import React, { useContext, useState } from 'react';
import { AuthContext } from '../Context.jsx/AuthProvider';
import { useNavigate } from 'react-router-dom';

const AddBlog = () => {
  const { user } = useContext(AuthContext);

  const [dairy, setDairy] = useState({
    title: '',
    description: '',
    category: '',
    createdBy: {
      _id: user?._id,
      userName: user?.email,
    },
  });

  const navigate = useNavigate();

  const changeForm = (e) => {
    const { name, value } = e.target;
    setDairy((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:9000/api/blogs/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dairy),
      });

      const data = await res.json();

      if (!res.ok) return alert(data.message);

      setDairy({
        title: '',
        description: '',
        category: '',
        createdBy: {
          _id: user?._id,
          userName: user?.email,
        },
      });

      navigate('/journal');

    } catch (err) {
      console.error('Error:', err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 px-4 flex justify-center">

      {/* CARD */}
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">

        {/* TITLE */}
        <h1 className="text-3xl font-bold text-center text-purple-700 mb-6">
          ✍️ Write a Blog
        </h1>

        <form onSubmit={handleAdd} className="space-y-5">

          {/* TITLE */}
          <div>
            <label className="text-sm font-medium text-gray-600">Title</label>
            <input
              name="title"
              value={dairy.title}
              onChange={changeForm}
              placeholder="Enter blog title"
              className="w-full mt-1 border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>

          {/* CATEGORY */}
          <div>
            <label className="text-sm font-medium text-gray-600">Category</label>
            <input
              name="category"
              value={dairy.category}
              onChange={changeForm}
              placeholder="e.g. Mental Health"
              className="w-full mt-1 border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="text-sm font-medium text-gray-600">Description</label>
            <textarea
              name="description"
              value={dairy.description}
              onChange={changeForm}
              rows={5}
              placeholder="Write your thoughts..."
              className="w-full mt-1 border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none resize-none"
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full py-3 bg-purple-700 text-white rounded-lg font-semibold hover:bg-purple-800 transition"
          >
            Publish Blog 🚀
          </button>

        </form>
      </div>
    </div>
  );
};

export default AddBlog;