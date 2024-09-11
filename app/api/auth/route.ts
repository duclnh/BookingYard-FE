export async function POST(request: Request) {
    const res = await request.json()
    const sessionToken = res.sessionToken as string
    const expiresAt = res.expiresAt as string
    if (!sessionToken) {
        return Response.json(
            { message: 'No receive session token' },
            { status: 400 }
        )
    }
    const expiresDate = new Date(expiresAt).toUTCString()
    return Response.json(
        { res },
        {
            status: 200,
            headers: {
                'Set-Cookie': `sessionToken=${sessionToken}; Path=/; HttpOnly; Expires=${expiresDate}; SameSite=Lax; Secure`
            }
        }
    )
}
