import { type IntrospectSessionResponse } from "@/generated/intania/auth/account/v1/account";
import { grpc } from "./grpc";

export async function getSession(
  sessionId: string,
): Promise<IntrospectSessionResponse["session"]> {
  try {
    const res = await grpc.account.introspectSession({
      sessionId,
    });

    return res.session;
  } catch (error) {
    throw error;
  }
}

export async function getOIDCPublicId(sessionId: string): Promise<string> {
  try {
    const session = await grpc.account.me({
      sessionId,
    });

    if (!session.account) {
      throw new Error("Unauthorized");
    }

    return session.account.publicId;
  } catch (error) {
    throw error;
  }
}
