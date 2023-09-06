import CloseModal from '@/components/CloseModal'
import { SignUpForm } from '@/components/forms/SignUpForm'

import React from 'react'

const AuthModalpage = () => {
  return (
    <div className="fixed inset-0 z-10  bg-zinc-900/20">
      <div className="container mx-auto flex h-full max-w-[650px] items-center">
        <div className="relative h-fit w-full rounded-lg bg-zinc-100 px-2 py-20">
          <div className="absolute right-4 top-24">
            <CloseModal />
          </div>
          <SignUpForm />
        </div>
      </div>
    </div>
  )
}

export default AuthModalpage
