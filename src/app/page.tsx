// app/[id]/page.tsx
// Personaliserad brevversion — https://namn-projekt.vercel.app/...
// Hämtar mottagarens data från Vercel Blob Storage
// Visar 404 om ID inte finns — ingen mottagare kan se en annans brev

import { notFound } from 'next/navigation'
import { getLetter } from '@/lib/getLetters'
import ProfileContent from '@/components/ProfileContent'

interface Props {
  params: { id: string }
}

export default async function LetterPage({ params }: Props) {
  const { id } = await params   // ← await här
  console.log('params.id:', id)
  const letter = await getLetter(params.id)

  // Okänt ID → 404, inget avslöjas
  if (!letter) {
    notFound()
  }


  console.log('letter result:', letter)



  return (
    <ProfileContent
      initialLang={letter.lang}
      customGreeting={letter.greeting}
      customIntro={letter.intro}
      customNote={letter.note}
      // Brevversionen låser språket — mottagaren ser bara sitt eget språk
      lockLang={true}
    />
  )
}

// Generera metadata per brev (valfritt men bra)
export async function generateMetadata({ params }: Props) {
  const letter = await getLetter(params.id)
  if (!letter) return {}
  return {
    title: 'Mjukvaruutvecklare — Designfokus',
    robots: { index: false, follow: false }, // sökmotorer indexerar inte personliga brev
  }
}
