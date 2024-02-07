import { createClient } from "@supabase/supabase-js";

const REACT_APP_SUPABASE_URL = "https://xcgatwqoxfevbulhvajb.supabase.co"
const REACT_APP_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhjZ2F0d3FveGZldmJ1bGh2YWpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY3OTc4OTAsImV4cCI6MjAyMjM3Mzg5MH0.vBDqKIKIKDpFs1oTmJnMzU_ROFPptn2-Fih1EPmtMQ8"


const supabase = createClient(REACT_APP_SUPABASE_URL, REACT_APP_ANON_KEY);


export default supabase