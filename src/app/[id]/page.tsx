import { notFound } from 'next/navigation'
import { getLetter } from '@/lib/getLetters'
import ProfileContent from '../../components/ProfileContent'

interface Props {
  params: Promise<{ id: string }>
}

export default async function LetterPage({ params }: Props) {
  const { id } = await params
  const letter = await getLetter(id)

  if (!letter) notFound()

  return (
    <ProfileContent
      initialLang={letter!.lang}
      customGreeting={letter!.greeting}
      customIntro={letter!.intro}
      customNote={letter!.note}
      lockLang={true}
    />
  )
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params
  const letter = await getLetter(id)
  if (!letter) return {}
  return {
    title: 'Mjukvaruutvecklare — Designfokus',
    robots: { index: false, follow: false },
  }
}