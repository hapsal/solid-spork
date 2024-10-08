// TODO: Server-side validation with e.g., zod

export async function POST(res) {
  const data = await res.json()

  return Response.json(JSON.stringify(data))
} 
