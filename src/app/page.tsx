import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { TrashIcon } from "lucide-react";

export default function Component() {
  return (
    <div className="flex flex-col items-center py-12">
      <h1 className="text-4xl font-bold mb-8">Todo List</h1>
      <div className="w-full max-w-md">
        <div className="flex mb-4 gap-x-1">
          <Input
            className="flex-1 rounded-l-md"
            placeholder="Add a new todo..."
          />
          <Button className="rounded-md">Add</Button>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-800">
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-2">
              <Checkbox id="todo1" />
              <Label
                className="text-gray-500 dark:text-gray-400 line-through"
                htmlFor="todo1"
              >
                Buy groceries
              </Label>
            </div>
            <Button
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              size="sm"
              variant="ghost"
            >
              <TrashIcon className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-2">
              <Checkbox id="todo2" />
              <Label
                className="text-gray-900 dark:text-gray-100"
                htmlFor="todo2"
              >
                Finish project proposal
              </Label>
            </div>
            <Button
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              size="sm"
              variant="ghost"
            >
              <TrashIcon className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-2">
              <Checkbox id="todo3" />
              <Label
                className="text-gray-500 dark:text-gray-400 line-through"
                htmlFor="todo3"
              >
                Call mom
              </Label>
            </div>
            <Button
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              size="sm"
              variant="ghost"
            >
              <TrashIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
