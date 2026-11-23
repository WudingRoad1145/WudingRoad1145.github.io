import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { saveThought, ThoughtError } from "@/lib/good-responses";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const cookieName = "portfolio-good-visitor";
const uuid =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

async function readSmallBody(request: NextRequest) {
  const reader = request.body?.getReader();
  if (!reader)
    throw new ThoughtError("Leave a word, or a few, before sharing", 400);
  let length = 0;
  const chunks: Uint8Array[] = [];
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    length += value.byteLength;
    if (length > 2048) {
      await reader.cancel();
      throw new ThoughtError("Please keep your thought short", 413);
    }
    chunks.push(value);
  }
  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    throw new ThoughtError(
      "That thought couldn’t be read Please try again",
      400,
    );
  }
}

export async function POST(request: NextRequest) {
  // Next may normalize request.url to localhost behind a proxy. Compare the
  // browser's Origin to the public Host header rather than that internal URL.
  let sameOrigin = false;
  try {
    const origin = new URL(request.headers.get("origin") || "");
    sameOrigin =
      /^https?:$/.test(origin.protocol) &&
      origin.host.toLowerCase() === request.headers.get("host")?.toLowerCase();
  } catch {
    /* Missing or invalid Origin is rejected. */
  }
  if (!sameOrigin) {
    return NextResponse.json(
      { error: "Please share your thought from this page" },
      { status: 403 },
    );
  }
  if (!request.headers.get("content-type")?.startsWith("application/json")) {
    return NextResponse.json(
      { error: "Please share your thought using the form" },
      { status: 415 },
    );
  }
  const existingCookie = request.cookies.get(cookieName)?.value;
  const visitor =
    existingCookie && uuid.test(existingCookie) ? existingCookie : randomUUID();
  try {
    const body = await readSmallBody(request);
    const receipt = await saveThought(visitor, body?.answer);
    const response = NextResponse.json(receipt, {
      headers: { "Cache-Control": "no-store" },
    });
    response.cookies.set(cookieName, visitor, {
      httpOnly: true,
      sameSite: "lax",
      secure: request.nextUrl.protocol === "https:",
      maxAge: 60 * 60 * 24 * 365,
      path: "/",
    });
    return response;
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof ThoughtError
            ? error.message
            : "Your thought couldn’t be saved just now Please try again",
      },
      {
        status: error instanceof ThoughtError ? error.status : 503,
        headers: { "Cache-Control": "no-store" },
      },
    );
  }
}
