import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { supabase } from "../api/supabase-client";
import { getPost } from "../api/createPost";
import CreatePostModal from "../components/CreatePostModal";

export default function PostPage() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getPost().then(({ data }) => setPosts(data));
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Posts</h1>
          <div className="flex items-center gap-3">
            <CreatePostModal
              onCreated={(newPost) => setPosts([newPost, ...posts])}
            />
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Cerrar sesión
            </button>
          </div>
        </div>

        <ul className="space-y-4">
          {posts.map((p) => (
            <li key={p.id} className="bg-white p-4 rounded-xl shadow">
              <h2 className="text-xl text-black font-semibold">{p.title}</h2>
              <p className="text-gray-600 mt-1">{p.content}</p>
              <p className="text-xs text-gray-400 mt-2">
                por {p.profiles?.username || "Anónimo"} ·{" "}
                {new Date(p.created_at).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
