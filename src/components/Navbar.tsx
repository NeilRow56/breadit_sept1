import Link from 'next/link'
import ThemeButton from './ThemeButton'
import { buttonVariants } from './ui/button'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { Icons } from './Icon'
import AccountUserNav from './AccountUserNav'

const Navbar = async () => {
  const session = await getServerSession(authOptions)
  return (
    <header className="fixed inset-x-0 top-0 z-[70] h-fit border-b border-zinc-300 bg-zinc-100 py-2 dark:bg-slate-700">
      <nav className="container mx-auto flex h-full items-center justify-between sm:px-48">
        <ul className="flex gap-6">
          {/* Logo */}
          <li>
            <Link className="flex gap-2" href="/">
              <Icons.logo className="h-8 w-8 sm:h-6 sm:w-6" />
              <h3 className="hidden font-semibold text-zinc-700 md:block ">
                Breadit
              </h3>
            </Link>
          </li>
        </ul>
        <ul className="flex items-center gap-4 ">
          {session?.user ? (
            <AccountUserNav user={session.user} />
          ) : (
            <li>
              <Link className={buttonVariants()} href="/sign-in">
                Sign in
              </Link>
            </li>
          )}
          <ThemeButton />
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
