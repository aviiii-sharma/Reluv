import { createBrowserClient } from "@supabase/ssr";

export const createClient = () =>
  createBrowserClient(
    "https://jyawwspvkqdpufwdtppv.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5YXd3c3B2a3FkcHVmd2R0cHB2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc4MTIwNDYsImV4cCI6MjA2MzM4ODA0Nn0.vjfpNxn1uXjdkD1BhrRz1dGxayyiE1IOknKdxM2JG18",
  );
