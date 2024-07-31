'use client'

import { onAuthStateChanged } from 'firebase/auth'
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

import Loading from '@/components/utils/loading'
import { User } from '@/domain/entity/user_entity'
import { auth } from '@/feature/infrastructure/firestore/config'
import { IUserRepository } from '@/feature/infrastructure/repository/user_repository'

export const AuthContext = createContext({})

export const useAuthContext = () => useContext(AuthContext)

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const userRepository = new IUserRepository()
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        userRepository.getUserById({ uid: user.uid }).then((user) => {
          setCurrentUser(user)
        })
      } else {
        setCurrentUser(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {loading ? <Loading /> : children}
    </AuthContext.Provider>
  )
}
