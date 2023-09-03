import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'

const Admin = async () => {
  const session = await getServerSession(authOptions)

  if (session?.user) {
    return (
      <main className="flex flex-grow items-center ">
        <div className="w-full text-center">
          <button className="rounded-lg bg-blue-500 p-2 px-4 text-white">
            Admin Page - Welcome back {session?.user.username}
          </button>
        </div>
      </main>
    )
  }
  return (
    <main className="flex flex-grow items-center ">
      <div className="w-full text-center">
        <button className="rounded-lg bg-blue-500 p-2 px-4 text-white">
          Please sign in to view admin page.
        </button>
      </div>
    </main>
  )
}

export default Admin
