import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://pqfofbniphvkkdscpdem.supabase.co";
const supabaseKey = "your-key-in-quotes"; // Ensure this is wrapped in quotes
export const supabase = createClient(supabaseUrl, supabaseKey);
