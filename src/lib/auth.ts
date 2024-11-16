export function getSIDFromHeader(headers: Headers): string | null {
  const cookiesString = headers.get("cookie");
  const cookies = cookiesString?.split(";").reduce((acc, cookie) => {
    const [key, value] = cookie.split("=").map((v) => v.trim()) as [
      string,
      string,
    ];
    Object.assign(acc, { [key]: value });
    return acc;
  }, {}) as Record<string, string>;

  const sessionId = cookies.sid;

  return sessionId ?? null;
}
