export default async (req) => {
  // Comprobar que Netlify ha cargado las variables necesarias
  const required = [
    'FIREBASE_PROJECT_ID',
    'FIREBASE_CLIENT_EMAIL',
    'FIREBASE_PRIVATE_KEY'
  ]

  const missing = required.filter(
    (name) => !process.env[name]
  )

  if (missing.length > 0) {
    return new Response(
      JSON.stringify({
        ok: false,
        step: 'environment',
        missing
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }

  try {
    // Inicializar Firebase Admin solo después de comprobar las variables
    const { adminDb } = await import('../lib/firebaseAdmin.mjs')

    // Consultar como máximo un evento
    const snapshot = await adminDb
      .collection('events')
      .limit(1)
      .get()

    const result = {
      ok: true,
      message: 'Conexión con Firestore correcta',
      documentsFound: snapshot.size
    }

    console.log(result)

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    console.error('Error en la prueba de Firestore:', error)

    return new Response(
      JSON.stringify({
        ok: false,
        step: 'firestore',
        errorCode: error.code || error.name || 'UNKNOWN_ERROR'
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }
}

export const config = {
  schedule: '@hourly'
}