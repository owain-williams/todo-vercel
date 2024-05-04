"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Todo } from "@prisma/client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { useAction } from "next-safe-action/hooks";
import { addTodo } from "@/actions/add-todo";

const formSchema = z.object({
  title: z.string().min(1).max(191),
});

type TodoAddFormProps = {
  userId: string;
};

export default function TodoAddForm({ userId }: TodoAddFormProps) {
  const { refresh } = useRouter();
  const { execute, status } = useAction(addTodo);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    execute({ userId, title: values.title });
    form.reset();
    refresh();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex mb-4 gap-x-1"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input placeholder="What would you like to do?" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="rounded-md"
          type="submit"
          disabled={status === "executing"}
        >
          Add
        </Button>
      </form>
    </Form>

    // <>
    //   <form action={addTodo} className="flex mb-4 gap-x-1">
    //     <Input
    //       className="flex-1 rounded-l-md"
    //       placeholder="Add a new todo..."
    //     />
    //     <Button className="rounded-md" type="submit">
    //       Add
    //     </Button>
    //   </form>
    // </>
  );
}
