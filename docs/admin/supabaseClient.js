import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://pqfofbniphvkkdscpdem.supabase.co";
const supabaseKey = "your-key-in-quotes"; // Replace with actual key in quotes
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
