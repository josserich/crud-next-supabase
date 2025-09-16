import { supabase } from "@/supabase/client";
import { Session } from "@supabase/supabase-js";

const signIn = async () => {
  await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "https://crud-next-supabase-lilac.vercel.app/auth/callback",
    },
  });
};
const signOut = async () => {
  await supabase.auth.signOut();
};
const getAuthentication = async () => {
  const { data } = await supabase.auth.getSession();
  const session: Session | null = data.session;
  if (!session) return null;
  const { avatar_url, email, full_name } = session.user.user_metadata as {
    avatar_url: string;
    email: string;
    full_name: string;
  };
  return { avatar_url, email, full_name };
};
const getAuthorization = async () => {
  const session = await supabase.auth.getSession();
  const token = session.data.session?.access_token;
  return token;
};

const authAPI = {
  signIn,
  signOut,
  getAuthentication,
  getAuthorization,
};

export default authAPI;
