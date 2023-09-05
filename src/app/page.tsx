import UserCard from '@/components/UserCard'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import Link from 'next/link'

export default async function Home() {
  const session = await getServerSession(authOptions)
  return (
    <main className="flex flex-grow items-center ">
      <div className=" mx-auto   text-center">
        <div className="rounded-lg bg-blue-500 p-2 px-4 text-white">
          <h1>Welcome to Home Page</h1>
        </div>
        <div className="mt-4 rounded-md bg-green-200">
          <Link className="" href="/admin">
            Admin Page 290
          </Link>
        </div>
        <div className="mt-4 rounded-md bg-blue-500 text-white">
          <h2>Client Session</h2>
          <UserCard />
          <h2>Server Session</h2>
          {JSON.stringify(session)}
        </div>
      </div>
    </main>
  )
}
