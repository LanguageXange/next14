"use client";

import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { TextField, Button, Callout, Text } from "@radix-ui/themes";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/validationSchema";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";

type FormInput = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: zodResolver(createIssueSchema),
  });

  const [err, setErr] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // console.log(errors);
  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    try {
      setIsSubmitting(true);
      await axios.post("/api/issues", data);
      router.push("/issues"); // we don't need to setIsSubmitting to false as we will redirect user to issues page
    } catch (error) {
      // console.log(error, "what is error");
      setIsSubmitting(false);
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
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <TextField.Root>
          <TextField.Input placeholder="Title ..." {...register("title")} />
        </TextField.Root>

        {/* our zod custom error doesn't appear */}

        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Describe the issue here ..." {...field} />
          )}
        />

        <Button disabled={isSubmitting}>
          {" "}
          Submit Issue
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
