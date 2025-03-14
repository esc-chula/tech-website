import { NextResponse } from 'next/server'

export async function POST(): Promise<NextResponse> {
  await Promise.resolve()
  return NextResponse.json({
    success: true,
    message: "Congratulations! You've found a hidden ticket!",
    data: {
      ticketCode: 'GEN_5XQ5YJKU16',
    },
  })
}
