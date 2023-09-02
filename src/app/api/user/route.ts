import bcryptjs from 'bcryptjs'

import { db } from '@/lib/db'
import { NextResponse } from 'next/server'
import * as z from 'zod'

//Define a schema for input validation
const UserSchema = z.object({
  username: z.string().min(1, 'Username is required').max(100),
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must have at least 6 characters'),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, username, password } = UserSchema.parse(body)

    //check if email alreadt exists

    const existingUserByEmail = await db.user.findUnique({
      where: { email: email },
    })

    if (existingUserByEmail) {
      return NextResponse.json(
        { user: null, message: 'User with this email alreay exists.' },
        { status: 409 }
      )
    }
    //check if username alreadt exists

    const existingUserByUsername = await db.user.findUnique({
      where: { username: username },
    })

    if (existingUserByUsername) {
      return NextResponse.json(
        { user: null, message: 'User with this username alreay exists.' },
        { status: 409 }
      )
    }

    const hashedPassword = await bcryptjs.hash(password, 12)

    const newUser = await db.user.create({
      data: {
        username,
        email,
        hashedPassword,
      },
    })

    //so that we do not send back password - even though it is hashed.

    const { hashedPassword: newUserPassword, ...rest } = newUser

    return NextResponse.json(
      { user: rest, message: 'User created successfully' },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { message: 'Something went wrong!' },
      { status: 500 }
    )
  }
}
