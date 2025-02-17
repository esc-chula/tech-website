export function getSIDFromHeader(headers: Headers): string | null {
  const cookiesString = headers.get('cookie')

  if (!cookiesString) {
    return null
  }

  const cookies = cookiesString
    .split(';')
    .reduce<Record<string, string>>((acc, cookie) => {
      const [key, value] = cookie.split('=').map((v) => v.trim())
      if (key && value) {
        acc[key] = value
      }
      return acc
    }, {})

  const sessionId = cookies.sid

  return sessionId ?? null
}
