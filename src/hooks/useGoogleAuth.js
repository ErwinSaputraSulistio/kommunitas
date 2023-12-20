import { useSupabaseClient } from '@supabase/auth-helpers-react'

const useGoogleAuth = () => {
  const supabase = useSupabaseClient()
  
  const login = async() => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        scopes: 'https://www.googleapis.com/auth/calendar'
      }
    })
    if(error) {
      alert('Error: Google SSO')
      console.log(error)
    }
  }
  const logout = async() => {
    console.log("tes")
    await supabase.auth.signOut()
  }

  return { login, logout }
}

export default useGoogleAuth