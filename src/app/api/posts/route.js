import mongoose from "mongoose";
import Post from "@/app/Model/Post";
import { connectDB } from "@/app/dbConfig/dbConfig";


connectDB();

// POST 
export async function POST(req) {
  try {
  
    const { title, content, tags } = await req.json();
    const post = await Post.create({ title, content, tags });
    return new Response(JSON.stringify(post), { status: 201 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

// GET 
export async function GET(req) {
  try {
   
    const posts = await Post.find();
    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

