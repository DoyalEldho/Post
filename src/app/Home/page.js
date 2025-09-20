

'use client';

import axios from 'axios';
import React, { useState } from 'react'

const page = () => {


 const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: '',
  });

    const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit=async(e)=>{
    e.preventDefault();

   const { title, content, tags } = formData;

    const post = {
    title,
    content,
    tags: tags.split(',').map(tag => tag.trim()),
  };

  //  console.log(post);
   
  try {
    const res  = await axios.post('/api/posts',post);
    alert("Data Sent Successfully");
       setFormData({
        title: '',
        content: '',
        tags: '',
      });
    
  } catch (error) {
    console.log(error);
    
  }

  }
  return (
    <div className='mt-10'>
       <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md space-y-4 max-w-xl mx-auto">
      <h2 className="text-2xl text-center font-bold mb-4">Create Post</h2>

      <div>
        <label className="block font-semibold mb-1">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded p-2"
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Content</label>
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          required
          rows={5}
          className="w-full border border-gray-300 rounded p-2"
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Tags (comma-separated)</label>
        <input
          type="text"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          required
          placeholder="e.g. react, nextjs, express"
          className="w-full border border-gray-300 rounded p-2"
        />
      </div>

      <button
        type="submit"
        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
      >
        Submit
      </button>
    </form>
    </div>
  )
}

export default page
