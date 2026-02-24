export async function askAI(message) {
  const res = await fetch('https://agenda-inteligente-backend-f4ga.onrender.com/ai', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message })
  })
  if (!res.ok) throw new Error(`Error IA: ${res.status}`)
  return await res.json()
}