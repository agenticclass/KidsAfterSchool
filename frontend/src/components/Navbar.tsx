import { Button } from './ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

export interface NavbarProps {
  onSignIn: () => void
  onSignUp: () => void
}

export default function Navbar({ onSignIn, onSignUp }: NavbarProps) {
  const navigate = useNavigate()
  const { user, signOut } = useAuth()

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  return (
    <nav className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link to="/" className="font-semibold text-lg">
            KidsAfterSchool
          </Link>
        </div>
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">
                {user.user_metadata?.name || user.email}
              </span>
              <Button 
                variant="ghost" 
                className="text-sm"
                onClick={handleSignOut}
              >
                Logout
              </Button>
            </div>
          ) : (
            <>
              <Button 
                variant="ghost" 
                className="text-sm"
                onClick={onSignIn}
              >
                Sign In
              </Button>
              <Button 
                className="text-sm"
                onClick={onSignUp}
              >
                Sign Up
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
