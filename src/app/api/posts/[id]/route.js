import Post from "@/app/Model/Post";
import { connectDB } from "@/app/dbConfig/dbConfig";


export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const { id } = params;
    await Post.findByIdAndDelete(id);
    return new Response(JSON.stringify({ message: "Post deleted" }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const { title, content, tags } = await req.json();
    const updatedPost = await Post.findByIdAndUpdate(id, { title, content, tags }, { new: true });
    return new Response(JSON.stringify(updatedPost), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
