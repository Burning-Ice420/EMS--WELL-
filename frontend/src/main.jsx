import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import AuthContext from "./context/authContext.jsx";
import { createClient } from "@supabase/supabase-js";
import { SessionContextProvider } from "@supabase/auth-helpers-react";

const supabase = createClient(
  "https://dajhewfpcruvpqluywmj.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRhamhld2ZwY3J1dnBxbHV5d21qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY2OTkxOTUsImV4cCI6MjA1MjI3NTE5NX0.OdMVZG6hdhLh3tsKTmSwGuMryoD8L_doIo6Qg34k-ig"
);

createRoot(document.getElementById("root")).render(
  <AuthContext>
    <SessionContextProvider supabaseClient={supabase}>
      <App />
    </SessionContextProvider>
  </AuthContext>
);
