import { useState } from "react";
import { supabase } from "../api/supabase-client";
export default function CreatePostModal({ onCreated }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { data, error } = await supabase
      .from("posts")
      .insert([{ user_id: user.id, title, content }])
      .select(
        `
        id,
        title,
        content,
        created_at,
        profiles (
          username,
          full_name
        )
      `,
      )
      .single();

    setLoading(false);
    if (error) return alert(error.message);

    onCreated(data); // ➜ añadimos el nuevo post al array
    setTitle("");
    setContent("");
    setOpen(false);
  };

  if (!open)
    return (
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
      >
        Nuevo post
      </button>
    );

  return (
    <div className="fixed inset-0 bg-gray-800/20 bg-opacity-40 flex items-center justify-center px-4 z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4 text-black">Crear post</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            required
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 text-black border-black w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          <textarea
            required
            placeholder="Contenido"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="border-2 border-black text-black w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none h-28 resize-none"
          />
          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray800"
            >
              Cancelar
            </button>
            <button
              disabled={loading}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
            >
              {loading ? "Creando…" : "Publicar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
