"use client";
import {
  Button,
  Callout,
  CalloutRoot,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import SimpleMdeReact from "react-simplemde-editor";
import { useState } from "react";

const MdeEditor = dynamic(
  () => import("react-simplemde-editor").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => <TextArea placeholder="Description" className="h-72" />,
  }
);

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<IssueForm>();
  const [error, setError] = useState("");

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className="space-y-5"
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post("/api/issues", data);
            router.push("/issues");
          } catch (error) {
            setError("An unexpected error occured.");
          }
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
    </div>
  );
};

export default NewIssuePage;
