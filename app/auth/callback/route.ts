import { getUser } from "@/queries/user";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const encodedRedirectTo = searchParams.get("redirect") || "/todos";

  const redirectTo = decodeURIComponent(encodedRedirectTo);

  if (code) {
    const supabase = await createClient();
    await supabase.auth.exchangeCodeForSession(code);
    const userData = await getUser();
    return NextResponse.redirect(`${origin}${redirectTo}`);
  }
}
