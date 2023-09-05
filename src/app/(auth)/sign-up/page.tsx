import { SignUpForm } from '@/components/forms/SignUpForm'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'

const SignUpPage = () => {
  return (
    <main className="flex min-h-full w-full flex-col justify-center bg-gray-100 py-12 sm:px-6 lg:px-8 ">
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          '-mt-30 self-start px-20'
        )}
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        Home
      </Link>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <SignUpForm />
      </div>
    </main>
  )
}

export default SignUpPage
