"use server";
import { db } from "@/db";
import { redirect } from "next/navigation";

export async function editSnippets(id: number, code: string) {
  await db.snippet.update({ where: { id }, data: { code } });

  redirect(`/snippets/${id}`);
}

export async function deleteSnippet(id: number) {
  await db.snippet.delete({ where: { id: id } });
  redirect(`/`);
}
