"use client";

import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { TextField, Button, Callout } from "@radix-ui/themes";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
interface IFormInput {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<IFormInput>();

  const [err, setErr] = useState("");

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (error) {
      // console.log(error, "what is error");
      setErr("Oops ! something's wrong!");
    }
  };
  return (
    <div className="max-w-xl ">
      {err && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{err}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
        <TextField.Root>
          <TextField.Input placeholder="Title ..." {...register("title")} />
        </TextField.Root>

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Describe the issue here ..." {...field} />
          )}
        />

        <Button> Submit Issue</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
