import { createClient } from "@supabase/supabase-js";

const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvZWR0cHZ2cGV6enR2ZHR4YnliIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMxMTY1MjYsImV4cCI6MjA2ODY5MjUyNn0.emEchU6GmVLDfReB7w53RtiSaKVb8PQK6Eux2Vfo5pM"; // Replace with your project URL
const SUPABASE_URL = "https://foedtpvvpezztvdtxbyb.supabase.co"; // Replace with your anon key

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
