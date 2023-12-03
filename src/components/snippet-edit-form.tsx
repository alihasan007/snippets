"use client";
import type { Snippet } from "@prisma/client";
import { Editor } from "@monaco-editor/react";
import { useState } from "react";
import {editSnippets} from "@/actions";

interface SnippetEditProps {
  snippet: Snippet;
}

const SnippetEditForm = ({ snippet }: SnippetEditProps) => {
  const [code, setCode] = useState(snippet.code);
  const handleEditorChange = (value: string = "") => {
    setCode(value);
  };
  const editSnippetAction = editSnippets.bind(null, snippet.id, code);
  return (
    <div className="flex flex-col mt-5">
      <Editor
        defaultLanguage="javascript"
        height="40vh"
        theme="vs-dark"
        defaultValue={code}
        options={{ minimap: { enabled: false } }}
        onChange={handleEditorChange}
      />
      <form action={editSnippetAction}>
        <button type="submit" className="p-2 border rounded mt-4">
          Save
        </button>
      </form>
    </div>
  );
};

export default SnippetEditForm;
