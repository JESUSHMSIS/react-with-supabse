import { createClient } from "@supabase/supabase-js";
const supabaseURL = import.meta.env.VITE_REACT_APP_SUPABASE_URL;
const supabaseAnonkey = import.meta.env.VITE_REACT_APP_SUPABASE_ANON_KEY;
console.log(supabaseURL, supabaseAnonkey);
export const supabase = createClient(supabaseURL, supabaseAnonkey);
