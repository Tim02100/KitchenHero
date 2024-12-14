// /app/api/pantry/route.ts
import { NextResponse } from 'next/server';

export interface PantryItem {
  id: string;
  name: string;
  kategorie: string;
  ablaufdatum: string;
  menge: string;
  status: 'Gut' | 'Niedrig' | 'Abgelaufen';
  bestand: number;
  createdAt: string;
  updatedAt: string;
}

// GET /api/pantry
export async function GET() {
  try {
    // TODO: Implementiere Datenbankanbindung
    // Momentan Mock-Daten
    const items = [
      {
        id: '1',
        name: 'Kaffeebohnen',
        kategorie: 'Getränke',
        ablaufdatum: '2023-12-31',
        menge: '500g',
        status: 'Gut',
        bestand: 75,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];

    return NextResponse.json({ items });
  } catch (error) {
    console.error('Fehler beim Abrufen der Vorratskammer:', error);
    return NextResponse.json(
      { error: 'Interner Serverfehler' },
      { status: 500 }
    );
  }
}

// POST /api/pantry
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validierung
    if (!body.name || !body.kategorie || !body.ablaufdatum) {
      return NextResponse.json(
        { error: 'Pflichtfelder fehlen' },
        { status: 400 }
      );
    }

    const newItem: PantryItem = {
      id: Date.now().toString(), // Temporäre ID-Generierung
      ...body,
      status: 'Gut',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // TODO: Speichere in Datenbank
    
    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    console.error('Fehler beim Hinzufügen des Items:', error);
    return NextResponse.json(
      { error: 'Interner Serverfehler' },
      { status: 500 }
    );
  }
}

// PUT /api/pantry/:id
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    
    if (!body.id) {
      return NextResponse.json(
        { error: 'ID fehlt' },
        { status: 400 }
      );
    }

    // TODO: Update in Datenbank

    return NextResponse.json(body);
  } catch (error) {
    console.error('Fehler beim Aktualisieren des Items:', error);
    return NextResponse.json(
      { error: 'Interner Serverfehler' },
      { status: 500 }
    );
  }
}

// DELETE /api/pantry/:id
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'ID fehlt' },
        { status: 400 }
      );
    }

    // TODO: Lösche aus Datenbank

    return NextResponse.json({ message: 'Item erfolgreich gelöscht' });
  } catch (error) {
    console.error('Fehler beim Löschen des Items:', error);
    return NextResponse.json(
      { error: 'Interner Serverfehler' },
      { status: 500 }
    );
  }
}