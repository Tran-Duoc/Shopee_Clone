import { createContext, useState } from 'react'
import { getAccessToken, getProfileFromLS } from 'src/utils/auth'
import { User } from '../types/user.types'

interface TypeAppProvider {
  children: React.ReactNode
}
interface AppContextType {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  profile: User | null
  setProfile: React.Dispatch<React.SetStateAction<User | null>>
}

const initialState: AppContextType = {
  isAuthenticated: Boolean(getAccessToken()),
  setIsAuthenticated: () => null,
  profile: getProfileFromLS(),
  setProfile: () => null
}

export const AppContext = createContext<AppContextType>(initialState)

export const AppProvider = ({ children }: TypeAppProvider) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialState.isAuthenticated)
  const [profile, setProfile] = useState<User | null>(initialState.profile)
  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        profile,
        setProfile
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
