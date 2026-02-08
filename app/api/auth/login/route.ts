import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(req: NextRequest) {
  try {
    const { email, lozinka } = await req.json();

    // 1. Validacija unosa
    if (!email || !lozinka) {
      return NextResponse.json({ error: "Email i lozinka su obavezni" }, { status: 400 });
    }

    // 2. Provera da li korisnik postoji
    const result = await query('SELECT * FROM korisnik WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user) {
      return NextResponse.json({ error: "Pogrešan email ili lozinka" }, { status: 401 });
    }

    // 3. Provera lozinke
    const lozinkaTacna = await bcrypt.compare(lozinka, user.lozinka_hash);

    if (!lozinkaTacna) {
      return NextResponse.json({ error: "Pogrešan email ili lozinka" }, { status: 401 });
    }

    // 4. Kreiranje JWT tokena
    const token = jwt.sign(
      { userId: user.id_korisnik, email: user.email, uloga: user.uloga },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    );

    // 5. Slanje odgovora
    const response = NextResponse.json({
      message: "Uspešna prijava",
      user: { 
        id: user.id_korisnik, 
        ime: user.ime,
        prezime: user.prezime,
        email: user.email,
        uloga: user.uloga
      },
      token
    }, { status: 200 });

    // Postavljanje tokena u kolačić
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 86400,
      path: '/',
    });

    return response;

  } catch (error: any) {
    return NextResponse.json({ 
      error: error.message, 
      detail: error.detail
    }, { status: 500 });
  }
}