import { supabase } from "@/supabase/client";

const signIn = async () => {
  await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `http://localhost:3000/auth/callback`,
    },
  });
};

const signOut = async () => {
  await supabase.auth.signOut();
};

const getAuthentication = async () => {
  const session: any = await supabase.auth.getSession();
  const { avatar_url, email, full_name } =
    session.data.session.user.user_metadata;
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
