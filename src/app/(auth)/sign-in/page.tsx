import SignInForm from '@/components/forms/SignInForm'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'

const SignInPage = () => {
  return (
    <main className="flex min-h-full w-full flex-col justify-center bg-gray-100 py-12 sm:px-6 lg:px-8 ">
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          '-mt-20 self-start px-20'
        )}
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        Home
      </Link>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <SignInForm />
      </div>
    </main>
  )
}

export default SignInPage
