import Link from "next/link";
import Tags from "./filters";

export default function SideBar() {
  return (
    <>
      <div className="w-64 border-r bg-secondary/10">
        <div className="flex flex-col p-4">
          <span className="text-lg font-bold mb-4">Tags</span>
          <Tags />
        </div>
      </div>
    </>
  );
}
