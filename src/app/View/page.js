'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const page = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
const [editingPost, setEditingPost] = useState(null);

  // Fetch all posts
  const fetchPosts = async () => {
    try {
      const res = await axios.get('/api/posts');
      setPosts(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Delete a post
  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    try {
      await axios.delete(`/api/posts/${id}`);
      setPosts(posts.filter(post => post._id !== id));
      fetchPosts();
    } catch (err) {
      console.error(err);
    }
  };

  // Edit a post
const handleEdit = (post) => {
  setEditingPost(post);
};

  if (loading) return <p>Loading posts...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10">
        <h1 className="text-2xl font-bold mb-4">Posts</h1>
      {posts.length === 0 ? (
          <p className="text-gray-500 text-lg text-center max-w-md">
      Looks like there are no posts yet
  </p>
      ) : (
          <div className="space-y-4">
          {posts.map(post => (
            <div key={post._id} className="border p-4 rounded shadow-md">
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p className="mt-2">{post.content}</p>
              <p className="mt-1 text-gray-500">
                Tags: {post.tags?.join(', ')}
              </p>
              <div className="mt-2 space-x-2">
                <button
                  onClick={() => handleEdit(post)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(post._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {editingPost && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
      <h2 className="text-xl font-bold mb-4">Edit Post</h2>
      <input
        type="text"
        placeholder="Title"
        value={editingPost.title}
        onChange={(e) =>
          setEditingPost({ ...editingPost, title: e.target.value })
        }
        className="w-full border p-2 mb-3 rounded"
      />
      <textarea
        placeholder="Content"
        value={editingPost.content}
        onChange={(e) =>
          setEditingPost({ ...editingPost, content: e.target.value })
        }
        className="w-full border p-2 mb-3 rounded"
        rows={4}
      />
      <input
        type="text"
        placeholder="Tags (comma-separated)"
        value={editingPost.tags.join(', ')}
        onChange={(e) =>
          setEditingPost({ ...editingPost, tags: e.target.value.split(',').map(t => t.trim()) })
        }
        className="w-full border p-2 mb-4 rounded"
      />
      <div className="flex justify-end space-x-2">
        <button
          className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
          onClick={() => setEditingPost(null)}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={async () => {
            try {
              await axios.put(`/api/posts/${editingPost._id}`, editingPost);
              setPosts(posts.map(post => post._id === editingPost._id ? editingPost : post));
              setEditingPost(null);
            } catch (err) {
              console.error(err);
            }
          }}
        >
          Save
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default page;
