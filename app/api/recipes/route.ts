import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(request: Request) {
  const { ingredients, diets } = await request.json();

  if (!ingredients || ingredients.length === 0) {
    return NextResponse.json({ error: 'Zutaten müssen angegeben werden' }, { status: 400 });
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY ist nicht definiert');
    }

    // Gemini API-Client initialisieren
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    // Prompt für die Gemini API erstellen
    const prompt = `Generiere 3 Rezepte basierend auf folgenden Zutaten: ${ingredients.join(", ")}. 
                    Berücksichtige dabei folgende Diäten: ${diets?.join(", ") || 'Keine Diätpräferenzen'}.
                    Gib die Rezepte im folgenden JSON-Format zurück:
                    [
                      {
                        "name": "Rezeptname",
                        "description": "Kurze Beschreibung des Gerichts",
                        "ingredients": ["Zutat 1 mit Menge", "Zutat 2 mit Menge", ...],
                        "instructions": ["Schritt 1", "Schritt 2", ...],
                        "prepTime": Zubereitungszeit in Minuten (nur Zahl),
                        "cookTime": Kochzeit in Minuten (nur Zahl),
                        "servings": Anzahl der Portionen (nur Zahl),
                        "calories": Kalorien pro Portion (nur Zahl),
                        "protein": Proteingehalt in Gramm pro Portion (nur Zahl),
                        "carbs": Kohlenhydrate in Gramm pro Portion (nur Zahl),
                        "fat": Fettgehalt in Gramm pro Portion (nur Zahl),
                        "difficulty": "Einfach" oder "Mittel" oder "Fortgeschritten",
                        "tags": ["Tag1", "Tag2", ...],
                        "tips": ["Tipp 1", "Tipp 2", ...]
                      }
                    ]
                    Stelle sicher, dass die Ausgabe valides JSON ist.`;

    // Anfrage an Gemini senden
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Text bereinigen und JSON parsen
    const cleanedText = text.replace(/```json\n?|\n?```/g, '').trim();
    const recipes = JSON.parse(cleanedText);

    // Rückgabe der Rezeptdaten
    return NextResponse.json(recipes);

  } catch (error) {
    console.error('Fehler bei der Kommunikation mit der Gemini API:', error);
    return NextResponse.json({ error: 'Interner Serverfehler' }, { status: 500 });
  }
}