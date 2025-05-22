import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const createClient = async () => {
  const cookieStore = cookies();

  return createServerClient(
    "https://jyawwspvkqdpufwdtppv.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5YXd3c3B2a3FkcHVmd2R0cHB2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc4MTIwNDYsImV4cCI6MjA2MzM4ODA0Nn0.vjfpNxn1uXjdkD1BhrRz1dGxayyiE1IOknKdxM2JG18",
    {
      cookies: {
        getAll() {
          return cookieStore.getAll().map(({ name, value }) => ({
            name,
            value,
          }));
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        },
      },
    },
  );
};
