import { NextRequest, NextResponse } from 'next/server';
import connection from '@/dbConfig/dbConfig'; // Adjust the path to your database setup

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;

  try {
    // Execute a DELETE query on your database
    const query = 'DELETE FROM fruit WHERE id = $1';
    const result = await connection.query(query, [id]);

    if (result.rowCount === 0) {
      return NextResponse.json(
        { success: false, message: 'Record not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Record deleted successfully',
    });
  } catch (error: any) {
    console.error('Error deleting record:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Internal Server Error',
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const reqBody = await request.json();
    const { date, product_name, color, amount, unit } = reqBody;
    // Execute a DELETE query on your database
    const query =
      'UPDATE fruit SET date = $1, product_name = $2, color = $3, amount = $4, unit = $5 WHERE id = $6 RETURNING *';
    const result = await connection.query(query, [
      date,
      product_name,
      color,
      amount,
      unit,
      id,
    ]);

    if (result.rowCount === 0) {
      return NextResponse.json(
        { success: false, message: 'Fruit not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Fruit updated successfully',
      result: result.rows[0],
    });
  } catch (error: any) {
    console.error('Error deleting record:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Internal Server Error',
        error: error.message,
      },
      { status: 500 }
    );
  }
}
