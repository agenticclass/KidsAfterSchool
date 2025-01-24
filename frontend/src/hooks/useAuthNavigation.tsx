import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'

export const useAuthNavigation = () => {
  const { session } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (session) {
      navigate('/dashboard')
    }
  }, [session, navigate])
}
