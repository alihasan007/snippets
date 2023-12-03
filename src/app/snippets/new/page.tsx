import { redirect } from "next/navigation";
import { db } from "@/db";

const SnippetCreatePage = () => {
  async function createSnippet(formData: FormData) {
    // needs to be server actions

    "use server";
    // check the user input make sure they are filled

    const title = formData.get("title") as string;
    const code = formData.get("code") as string;

    // Create a new record in DB
    const snippet = await db.snippet.create({
      data: {
        title,
        code,
      },
    });
    console.log(snippet);
    //Redirect user to root route
    redirect("/");
  }

  return (
    <div>
      <form action={createSnippet}>
        <h3 className="font-bold m-3">Create a Snippet</h3>
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <label className="w-12" htmlFor="title">
              Title
            </label>
            <input
              name="title"
              className="border rounded p-2 w-full"
              id="title"
            />
          </div>
          <div className="flex gap-4">
            <label className="w-12" htmlFor="code">
              Code
            </label>
            <textarea
              name="code"
              className="border rounded p-2 w-full"
              id="code"
            />
          </div>
          <button type="submit" className=" rounded p-2 bg-blue-200">
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default SnippetCreatePage;
