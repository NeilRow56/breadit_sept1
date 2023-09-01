'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import Link from 'next/link'

const FormSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must have at least 6 characters'),
})

const SignInForm = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    console.log(values)
  }

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div
        className="
        bg-white
          px-4
          py-8
          shadow
          sm:rounded-lg
          sm:px-10
        "
      >
        <div className="mb-2 text-2xl font-bold text-blue-800">
          <h2>Signin</h2>
        </div>
        <div className="mb-2  text-gray-400 ">
          <h3>Signin to access client files</h3>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="pb-3">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-blue-800">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="mail@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="pb-3">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-blue-800">
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex w-full items-center justify-end space-x-2 pt-6">
              <Button
                className="w-full bg-blue-800 hover:bg-blue-500"
                type="submit"
              >
                Sign In
              </Button>
            </div>
          </form>
        </Form>

        <div className="mt-6">
          <div
            className="
            mt-6 
            flex 
            justify-center 
            gap-2 
            px-2 
            text-sm 
            text-gray-500
          "
          >
            <p className="mt-2 text-center text-sm text-gray-600">
              If you don&apos;t have an account, please&nbsp;
              <Link className="text-blue-500 hover:underline" href="/sign-up">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignInForm
