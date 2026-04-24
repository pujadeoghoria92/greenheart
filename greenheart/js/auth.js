import { supabase } from './supabase.js'

// SIGN UP a new user
export async function signUp(email, password, fullName) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName }   // stored in profiles table automatically
    }
  })
  if (error) throw error
  return data
}

// LOG IN existing user
export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw error
  return data
}

// LOG OUT
export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error('Logout error:', error.message);
  } else {
    window.location.href = "index.html"; // or login page
  }
}


// GET current logged-in user
export async function getUser() {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

// PROTECT a page — call this at top of dashboard.html and admin.html
export async function requireAuth() {
  const user = await getUser()
  if (!user) {
    window.location.href = '/login.html'
  }
  return user
}

// PROTECT admin page — check if user has admin role
export async function requireAdmin() {
  const user = await requireAuth()
  // You set admin role manually in Supabase:
  // Authentication → Users → click user → User metadata → add {"role":"admin"}
  if (user?.user_metadata?.role !== 'admin') {
    window.location.href = '/dashboard.html'
  }
  return user
}