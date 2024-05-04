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

const formSchema = z.object({
  title: z.string().min(1).max(191),
});

type TodoAddForm = {
  addTodo: (title: string) => Promise<Todo>;
};

export default function TodoAddForm({ addTodo }: TodoAddForm) {
  const { refresh } = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    addTodo(values.title);
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
        <Button className="rounded-md" type="submit">
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
