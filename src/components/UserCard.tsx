'use client'

import { useSession } from 'next-auth/react'

const UserCard = () => {
  const { data: session } = useSession()
  return (
    <pre className="border-5 flex w-auto justify-center  border border-blue-500 ">
      {JSON.stringify(session)}
    </pre>
  )
}

export default UserCard
