// lib/getLetters.ts
// Hämtar letters.json från Vercel Blob Storage
// Filen finns aldrig i Git — bara i Blob och lokalt

export type Lang = 'sv' | 'eu' | 'cas'

export interface Letter {
  lang: Lang
  greeting: string
  intro: string
  note: string
}

export interface LettersData {
  [id: string]: Letter
}

export async function getLetter(id: string): Promise<Letter | null> {
  const blobUrl = process.env.LETTERS_BLOB_URL
  const token   = process.env.BLOB_READ_WRITE_TOKEN

  if (!blobUrl || !token) {
    console.error('LETTERS_BLOB_URL eller BLOB_READ_WRITE_TOKEN saknas')
    return null
  }

  try {
    // ?download=1 tvingar Vercel att returnera filinnehållet (inte bara metadata)
    // Authorization: Bearer krävs för private blob
    const res = await fetch(`${blobUrl}?download=1`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: 60 },
    })

    if (!res.ok) {
      console.error('Kunde inte hämta letters.json:', res.status)
      return null
    }

    const data: LettersData = await res.json()
    console.log('Hittade IDs i letters.json:', Object.keys(data))
    return data[id] ?? null
  } catch (err) {
    console.error('Fel vid hämtning av letters.json:', err)
    return null
  }
}