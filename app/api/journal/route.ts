import { desc, eq } from 'drizzle-orm'
import { db } from '@/db'
import { journalEntries } from '@/db/schema'

export async function GET(req: Request) {
  const clientId = new URL(req.url).searchParams.get('clientId')
  if (!clientId) return Response.json({ entries: [] })

  const entries = await db
    .select()
    .from(journalEntries)
    .where(eq(journalEntries.clientId, clientId))
    .orderBy(desc(journalEntries.createdAt))
    .limit(200)

  return Response.json({ entries })
}

export async function POST(req: Request) {
  const body = await req.json()
  const { clientId, subject, subjectTitle, question, hypothesisText, resultText, matched, lang } = body ?? {}

  if (!clientId || !subject || !subjectTitle || !question || !hypothesisText || !resultText || typeof matched !== 'boolean' || !lang) {
    return Response.json({ error: 'Missing fields' }, { status: 400 })
  }

  const [entry] = await db
    .insert(journalEntries)
    .values({ clientId, subject, subjectTitle, question, hypothesisText, resultText, matched, lang })
    .returning()

  return Response.json({ entry }, { status: 201 })
}
