import connection from '@/dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const result = await connection.query(`
        SELECT 
            id,
            date, 
            product_name, 
            color, 
            amount, 
            unit, 
            (amount * unit) AS total
        FROM 
            fruit
        ORDER BY 
            id desc;
`);
    const fruits = result.rows;

    return NextResponse.json(
      {
        message: 'Get Fruits successfully',
        success: true,
        fruits,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { date, product_name, color, amount, unit } = reqBody;

    const result = await connection.query(
      `
            INSERT INTO
                fruit
                (date, product_name, color, amount, unit)
            VALUES
                ($1, $2, $3, $4, $5)
            RETURNING *`,
      [date, product_name, color, amount, unit]
    );
    const newFruit = result.rows[0];
    return NextResponse.json(
      {
        message: 'Fruit created successfully',
        success: true,
        newFruit,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
