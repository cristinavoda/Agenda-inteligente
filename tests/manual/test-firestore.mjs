export default async () => {
  const required = [
    'FIREBASE_PROJECT_ID',
    'FIREBASE_CLIENT_EMAIL',
    'FIREBASE_PRIVATE_KEY'
  ]

  const missing = required.filter(
    (name) => !process.env[name]
  )

  if (missing.length) {
    return new Response(
      JSON.stringify({ ok: false, missing }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }

  try {
    const { adminDb } =
      await import('../lib/firebaseAdmin.mjs')

    const snapshot = await adminDb
      .collection('events')
      .limit(1)
      .get()

    return new Response(
      JSON.stringify({
        ok: true,
        message: 'Conexión con Firestore correcta',
        documentsFound: snapshot.size
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  } catch (error) {
    console.error('Error de Firebase Admin:', error)

    return new Response(
      JSON.stringify({
        ok: false,
        code: error.code || error.name || 'UNKNOWN_ERROR'
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }
}