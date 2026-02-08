import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    const { ime, prezime, email, lozinka, uloga = 'RADNIK' } = await req.json();

    if (!ime || !prezime || !email || !lozinka) {
      return NextResponse.json(
        { error: "Obavezno: ime, prezime, email, lozinka" },
        { status: 400 }
      );
    }

    const hashedLozinka = await bcrypt.hash(lozinka, 10);

    const result = await query(
      `INSERT INTO korisnik (ime, prezime, email, lozinka_hash, uloga)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id_korisnik, ime, prezime, email, uloga`,
      [ime, prezime, email, hashedLozinka, uloga]
    );

    return NextResponse.json({ message: "Registrovan", user: result.rows[0] }, { status: 201 });
  } catch (error: any) {
    if (error.code === '23505') {
      return NextResponse.json({ error: "Email je već u upotrebi" }, { status: 409 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}