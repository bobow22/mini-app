import connection from '@/dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    // check email if user already exists
    const user = await connection.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if (!user.rows.length) {
      return NextResponse.json(
        { error: 'User does not exist' },
        { status: 400 }
      );
    }

    // check if password is correct
    const validPassword = await bcryptjs.compare(
      password,
      user.rows[0].password
    );
    if (!validPassword) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 400 });
    }

    // create token data
    const tokenData = {
      id: user.rows[0].id,
      username: user.rows[0].username,
      email: user.rows[0].email,
    };

    // create token
    const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY!, {
      expiresIn: '1d',
    });

    const response = NextResponse.json({
      message: 'Log in successfully',
      success: true,
    });

    // set cookies
    response.cookies.set('token', token, {
      httpOnly: true,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
