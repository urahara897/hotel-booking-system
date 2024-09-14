import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://xddvojgjagcryvuhzbdm.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkZHZvamdqYWdjcnl2dWh6YmRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ1ODk3MjksImV4cCI6MjA0MDE2NTcyOX0.XqnKoDnlRN-OHShepoHQopw9afuXHyp-rsLLvGso2EE";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
