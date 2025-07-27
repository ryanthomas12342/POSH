const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

console.log(supabaseUrl, supabaseAnonKey);
const supabase = createClient(supabaseUrl, supabaseAnonKey);

module.exports = { supabase };
