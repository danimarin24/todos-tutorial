"use server";

import { getUser } from "@/queries/user";
import { Todo } from "@/types/custom";
import { createClient } from "@/utils/supabase/server";
import exp from "constants";
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

export const deleteTodo = async (id: number) => {
  const supabase = await createClient();
  const user = await getUser();

  if (!user) {
    throw new Error("User is not logged in");
  }

  const { error } = await supabase.from("todos").delete().match({
    user_id: user.id,
    id: id,
  });

  if (error) {
    throw new Error("Error deleting task");
  }

  revalidatePath("/todos");
};

export const updateTodo = async (todo: Todo) => {
  const supabase = await createClient();
  const user = await getUser();

  if (!user) {
    throw new Error("User is not logged in");
  }

  const { error } = await supabase.from("todos").update(todo).match({
    user_id: user.id,
    id: todo.id,
  });

  if (error) {
    throw new Error("Error updating task");
  }

  revalidatePath("/todos");
};
