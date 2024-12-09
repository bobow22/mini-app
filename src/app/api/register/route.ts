import connection from '@/dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    // check email if user already exists
    // TODO: จะ check username ด้วยไหม เดี๋ยวดูอีกที
    const user = await connection.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if (user.rows.length) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    // hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const result = await connection.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
      [username, email, hashedPassword]
    );
    const newUser = result.rows[0];

    return NextResponse.json(
      {
        message: 'User registered successfully',
        success: true,
        newUser,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
