"use server";

import { getUser } from "@/queries/user";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export const createTodo = async (formData: FormData) => {
  const supabase = await createClient();
  const text = formData.get("todo") as string | null;

  if (!text) {
    throw new Error("Text is required");
  }

  const user = await getUser();

  if (!user) {
    throw new Error("User is not logged in");
  }

  const { error } = await supabase.from("todos").insert({
    task: text,
    user_id: user.id,
  });

  if (error) {
    throw new Error("Error creating task");
  }

  revalidatePath("/todos");
};
