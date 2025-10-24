import { supabase } from "./supabase-client";

export async function createPost(title, content) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("no esta autenticado");
  const { data, error } = await supabase
    .from("posts")
    .insert([{ user_id: user.id, title, content }])
    .select();
  return { data, error };
}

export async function getPost() {
  const { data, error } = await supabase
    .from("posts")
    .select("id,title,content,created_at,profiles(username,full_name)");
  return { data, error };
}
