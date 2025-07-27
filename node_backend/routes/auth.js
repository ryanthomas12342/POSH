const express = require("express");
const router = express.Router();
const { supabase } = require("../config/supabase");

const { createClient } = require("@supabase/supabase-js");

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } } // prevent background refresh
);

router.post("/register", async (req, res) => {
  const { name, email, password, phone } = req.body;
  console.log(req.body);
  if (!name || !email || !password || !phone) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const { data, error: signUpError } =
    await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      user_metadata: { name },
      email_confirm: true, // <- instantly verified
    });
  if (signUpError) {
    if (signUpError.code === "email_exists") {
      return res.status(409).json({ message: "E-mail already registered" });
    }
    return res.status(400).json({ message: error.message });
  }

  const userId = data.user?.id;
  if (!userId) {
    return res.status(500).json({ error: "User creation failed" });
  }

  // Insert profile
  const { error: profileError } = await supabaseAdmin
    .from("profiles")
    .insert([{ id: userId, name, phone }]);

  if (profileError) {
    console.error(profileError);
    return res.status(500).json({ error: "Profile creation failed" });
  }

  return res
    .status(200)
    .json({ message: "Signup successful! Please verify your email." });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const { data, error } = await supabaseAdmin.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return res.status(401).json({ message: error.message || "Login failed" });
  }

  // Return session info (access_token, refresh_token, user, etc.)
  return res.status(200).json({
    message: "Login successful!",
    session: data.session,
    user: data.user,
  });
});

module.exports = router;
