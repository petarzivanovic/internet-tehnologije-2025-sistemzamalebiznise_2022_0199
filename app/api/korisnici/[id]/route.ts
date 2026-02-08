// app/api/korisnici/[id]/route.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { query } from "@/lib/db";
import { requireAuth } from "@/lib/auth";

const DOZVOLJENE_ULOGE = ["VLASNIK", "RADNIK", "DOSTAVLJAC"];

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authUser = await requireAuth(req);

    if (!authUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if ((authUser as any).uloga !== "VLASNIK") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const idStr = String(params.id ?? "").trim();
    if (!/^\d+$/.test(idStr)) {
      return NextResponse.json({ error: "Neispravan ID" }, { status: 400 });
    }
    const korisnikId = Number(idStr);


    const body = await req.json();
    const { uloga } = body;

    if (uloga === undefined) {
      return NextResponse.json(
        { error: "Moraš poslati uloga" },
        { status: 400 }
      );
    }

    // zaštita: vlasnik ne može menjati sebe
    const authId = Number((authUser as any).userId ?? (authUser as any).id);
    if (korisnikId === authId) {  //USERID IL ID 
      if (uloga && uloga !== "VLASNIK") {
        return NextResponse.json(
          { error: "Ne možeš promeniti sopstvenu ulogu" },
          { status: 400 }
        );
      }
      
    }

    if (uloga && !DOZVOLJENE_ULOGE.includes(uloga)) {
      return NextResponse.json(
        { error: "Neispravna uloga" },
        { status: 400 }
      );
    }

    const polja = [];
    const vrednosti = [];

    if (uloga !== undefined) {
      polja.push(`uloga = $${polja.length + 1}`);
      vrednosti.push(uloga);
    }


    vrednosti.push(korisnikId);

    const result = await query(
      `
      UPDATE korisnik
      SET ${polja.join(", ")}
      WHERE id_korisnik = $${vrednosti.length}
      RETURNING id_korisnik AS "idKorisnik", ime, prezime, email, uloga
      `,
      vrednosti
    );

    if (result.rowCount === 0) {
      return NextResponse.json(
        { error: "Korisnik ne postoji" },
        { status: 404 }
      );
    }

    return NextResponse.json({ korisnik: result.rows[0] });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message ?? "Server error" },
      { status: 500 }
    );
  }
}
