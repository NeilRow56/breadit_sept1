import bcryptjs from 'bcryptjs'

import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, username, password } = body

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

    return NextResponse.json(
      { user: newUser, message: 'User created successfully' },
      { status: 201 }
    )
  } catch (error) {}
}
