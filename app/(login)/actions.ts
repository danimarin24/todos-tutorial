"use server";
import { z } from "zod";
import { validatedAction } from "@/lib/auth/middleware";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";
import config from "@/config";

const signSchema = z.object({
  email: z.string().email().min(3).max(255),
  password: z.string().min(8).max(100),
});

export const signIn = validatedAction(signSchema, async (data) => {
  const supabase = await createClient();
  const { email, password } = data;

  const { data: signInData, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    redirect("/sign-in?message=Could not authenticate user");
  }

  revalidatePath("/", "layout");
  redirect("/todos");
});

export const signUp = validatedAction(signSchema, async (data, formData) => {
  const supabase = await createClient();
  const { email, password } = data;

  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (signUpError) {
    return { error: signUpError.message };
  }

  revalidatePath("/", "layout");
  redirect("/todos");
});

export const signInWithMagicLink = validatedAction(
  z.object({
    email: z.string().email(),
    redirect: z.string().optional(),
  }),
  async (data) => {
    const supabase = await createClient();
    const { email } = data;
    const redirectTo = `${config.domainName}/auth/callback`;

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${redirectTo}?redirect=${encodeURIComponent("/todos")}`,
      },
    });
    if (error) {
      console.error("Error sending magic link:", error);
      return { error: error.message };
    }

    return { success: "Magic link sent to your email." };
  }
);

export const signInWithGithub = async (
  event: React.FormEvent<HTMLFormElement>
) => {
  event.preventDefault();
  const supabase = await createClient();
  try {
    const redirectTo = `${config.domainName}/auth/callback`;
    const { error: signInError } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${redirectTo}?redirect=${encodeURIComponent("/todos")}`,
      },
    });
    if (signInError) {
      return { error: "Failed to sign in with GitHub. Please try again." };
    }
  } catch (error) {
    return { error: "Failed to sign in with GitHub. Please try again." };
  }
};

export const signOut = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/sign-in");
};
