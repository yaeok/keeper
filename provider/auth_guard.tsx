'use client'
import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'

import Loading from '@/components/utils/Loading'
import { auth } from '@/feature/infrastructure/firestore/config'

type Props = {
  children: ReactNode
}

export const AuthGuard = ({ children }: Props) => {
  const user = auth.currentUser
  const router = useRouter()

  if (typeof user === 'undefined') {
    return <Loading />
  }
  if (user === null) {
    router.replace('/sign_in')
    return null
  }

  return <>{children}</>
}
