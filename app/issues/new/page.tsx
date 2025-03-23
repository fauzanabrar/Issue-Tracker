"use client";
import { Button, TextArea, TextField } from "@radix-ui/themes";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";

const MdeEditor = dynamic(
  () => import("react-simplemde-editor").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => <TextArea placeholder="Description" className="h-72" />,
  }
);

const NewIssuePage = () => {
  return (
    <div className="space-y-5 max-w-xl">
      <TextField.Root>
        <TextField.Input placeholder="Title" />
      </TextField.Root>
      <MdeEditor placeholder="Description" />

      <Button>New Issue</Button>
    </div>
  );
};

export default NewIssuePage;
