import { NextResponse } from 'next/server';
import pool from '../../lib/db';
// /api/search?q=example
/*
enum LangCode {
    FI = 1,
    SV = 2,
    EN = 3,
}
*/
export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id') || '';
   

    try {
        const client = await pool.connect();
        const result = await client.query(
            "SELECT c.id, c.desc_json FROM ytunnukset c WHERE c.id = $1 ;",
            [`${id}`]
        );
        client.release();

        return NextResponse.json(result.rows);
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }
}
