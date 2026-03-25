/** Health check for monitoring. Cached at edge to reduce DoS impact from repeated requests. */
export async function GET() {
  return Response.json(
    { status: "ok" },
    {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
      },
    }
  )
}
