"use client";

import { useTagFilterStore } from "@/state/tagfilter";
import { cn } from "@/lib/utils";

export default function Tags() {
  const { tags, toggleTag } = useTagFilterStore();

  return (
    <div className="flex flex-col gap-1">
      <div
        className={cn(
          `block py-2 text-sm rounded-md text-primary/80 p-2 border border-secondary/0`,
          tags.includes("inbox") && "bg-primary/10 border-primary/10"
        )}
        onClick={() => toggleTag("inbox")}
      >
        Inbox
      </div>
      <div
        className={cn(
          `block py-2 text-sm rounded-md text-primary/80 p-2 border border-secondary/0`,
          tags.includes("today") && "bg-primary/10 border-primary/10"
        )}
        onClick={() => toggleTag("today")}
      >
        Today
      </div>
      <div
        className={cn(
          `block py-2 text-sm rounded-md text-primary/80 p-2 border border-secondary/0`,
          tags.includes("upcoming") && "bg-primary/10 border-primary/10"
        )}
        onClick={() => toggleTag("upcoming")}
      >
        Upcoming
      </div>
      <div
        className={cn(
          `block py-2 text-sm rounded-md text-primary/80 p-2 border border-secondary/0`,
          tags.includes("someday") && "bg-primary/10 border-primary/10"
        )}
        onClick={() => toggleTag("someday")}
      >
        Someday
      </div>
    </div>
  );
}
