import { supabase } from './supabase.js'

// GET all scores for the logged-in user (newest first)
export async function getMyScores() {
  const { data, error } = await supabase
    .from('scores')
    .select('*')
    .order('score_date', { ascending: false })
  if (error) throw error
  return data   // array of {id, user_id, score_date, points}
}

// ADD a score (trigger in DB enforces 5-limit and no-duplicate-date)
export async function addScore(scoreDate, points) {
  const { data, error } = await supabase
    .from('scores')
    .insert({ score_date: scoreDate, points: points })
    .select()
  if (error) {
    // Supabase returns error code 23505 for duplicate date
    if (error.code === '23505') throw new Error('A score already exists for this date')
    throw error
  }
  return data[0]
}

// DELETE a score
export async function deleteScore(scoreId) {
  const { error } = await supabase
    .from('scores')
    .delete()
    .eq('id', scoreId)
  if (error) throw error
}

// EDIT a score (update points for an existing date)
export async function editScore(scoreId, newPoints) {
  const { data, error } = await supabase
    .from('scores')
    .update({ points: newPoints, updated_at: new Date().toISOString() })
    .eq('id', scoreId)
    .select()
  if (error) throw error
  return data[0]
}