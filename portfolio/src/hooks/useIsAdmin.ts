import { useAuth } from '../contexts/AuthContext'

export function useIsAdmin() {
  const { user } = useAuth()
  return user?.email === 'harshgupta.11dec@gmail.com'
} 