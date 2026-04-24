import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const SUPABASE_URL = 'https://uyyoyfbbgaokqvtxsryh.supabase.co/rest/v1/'       
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV5eW95ZmJiZ2Fva3F2dHhzcnloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY5MjM2MzcsImV4cCI6MjA5MjQ5OTYzN30.1HHuIAMA2ePULIhUfuwElfSyN_hYNDIctY2Nq4lzjfU'     

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)