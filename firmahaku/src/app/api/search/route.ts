import { NextResponse } from 'next/server';
import pool from '../../lib/db';

// /api/search?q=example
export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get('q') || '';
    /*
    const matchword = q; // <- the dynamic input
    const safeMatchword = matchword.replace(/"/g, '\\"'); // escape quotes

    const jsonPath = `$.names[*] ? (@.name like_regex ".*${safeMatchword}.*")`;

    const query = `
        (
            SELECT * FROM ytunnukset
            WHERE jsonb_path_exists(desc_json, $1)
        );
    `;

    const values = [jsonPath];
    */


    try {
        const client = await pool.connect();
        const result = await client.query( 
            
            "SELECT c.id, c.desc_json -> 'businessId' ->> 'value' as yt, n.* \
            FROM ytunnukset c, LATERAL (\
                SELECT name, type, \"registrationDate\" \
                FROM jsonb_to_recordset(c.desc_json -> 'names') AS n(\
                    name TEXT,\
                    type TEXT,\
                    \"registrationDate\" TEXT )\
                WHERE n.name ILIKE $1 \
                ORDER BY \"registrationDate\"::timestamp DESC LIMIT 1 \
            ) n \
          ORDER BY n.name;",
        [`%${q}%`] );
        
        client.release();

        return NextResponse.json(result.rows);
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }
}

        //'SELECT id, name FROM companies WHERE name ILIKE $1 LIMIT 20',
        /*"SELECT c.id, c.desc_json -> 'businessId' ->> 'value' as yt, n.* \
            FROM ytunnukset c, LATERAL (\
                SELECT name, type, \"registrationDate\" \
                FROM jsonb_to_recordset(c.desc_json -> 'names') AS n(\
                    name TEXT,\
                    type TEXT,\
                    \"registrationDate\" TEXT )\
                WHERE n.name ILIKE $1 \
                ORDER BY \"registrationDate\"::timestamp DESC LIMIT 1 \
            ) n \
          ORDER BY n.name;"*/