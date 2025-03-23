"use client";
import { Button, TextArea, TextField } from "@radix-ui/themes";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import SimpleMdeReact from "react-simplemde-editor";

const MdeEditor = dynamic(
  () => import("react-simplemde-editor").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => <TextArea placeholder="Description" className="h-72" />,
  },
);

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<IssueForm>();

  return (
    <form
      className="space-y-5 max-w-xl"
      onSubmit={handleSubmit(async (data) => {
        await axios.post("/api/issues", data);
        router.push("/issues");
      })}
    >
      <TextField.Root>
        <TextField.Input placeholder="Title" {...register("title")} />
      </TextField.Root>
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <MdeEditor placeholder="Description" {...field} />
          // <SimpleMdeReact placeholder="description" {...field} />
        )}
      />

      {/* <MdeEditor placeholder="Description" /> */}

      <Button>New Issue</Button>
    </form>
  );
};

export default NewIssuePage;
