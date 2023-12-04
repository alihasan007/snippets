"use server";
import { db } from "@/db";
import { redirect } from "next/navigation";
import { type } from "os";

export async function editSnippets(id: number, code: string) {
  await db.snippet.update({ where: { id }, data: { code } });

  redirect(`/snippets/${id}`);
}

export async function deleteSnippet(id: number) {
  await db.snippet.delete({ where: { id: id } });
  redirect(`/`);
}
export async function createSnippet(
  formState: { message: string },
  formData: FormData
) {
  try {
    const title = formData.get("title") as string;
    const code = formData.get("code") as string;

    if (typeof title !== "string" || title.length < 3) {
      return {
        message: "Title must be longer",
      };
    }
    if (typeof code !== "string" || code.length < 10) {
      return {
        message: "Code must be longer",
      };
    }
    // Create a new record in DB
    const snippet = await db.snippet.create({
      data: {
        title,
        code,
      },
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return { message: err.message };
    } else {
      return {
        message: "Something went wrong",
      };
    }
  }

  //Redirect user to root route
  redirect("/");
}
