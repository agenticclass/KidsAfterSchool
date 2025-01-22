import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { Session } from '@supabase/supabase-js'

type AuthContextType = {
  session: Session | null
  user: any
  loading: boolean
  signOut: () => Promise<void>
  forceRefresh: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  loading: true,
  signOut: async () => {},
  forceRefresh: async () => {}
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Get initial session
        const { data: { session }, error } = await supabase.auth.getSession()
        if (error) throw error
        
        setSession(session)
        setUser(session?.user ?? null)
        setLoading(false)

        // Set up auth state listener
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          async (event, session) => {
            console.log('Auth state changed:', event, session)
            setSession(session)
            setUser(session?.user ?? null)
            setLoading(false)
          }
        )

        return () => {
          if (subscription) {
            subscription.unsubscribe()
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error)
        setLoading(false)
      }
    }

    initializeAuth()
  }, [])

  const signOut = async () => {
    await supabase.auth.signOut()
    setSession(null)
    setUser(null)
  }

  const forceRefresh = async () => {
    const { data: { session }, error } = await supabase.auth.getSession()
    if (error) throw error
    setSession(session)
    setUser(session?.user ?? null)
    setLoading(false)
  }

  return (
    <AuthContext.Provider value={{ session, user, loading, signOut, forceRefresh }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
