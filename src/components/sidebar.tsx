import Link from "next/link";

export default function SideBar() {
  return (
    <>
      <div className="w-64 border-r bg-secondary">
        <div className="flex flex-col p-4">
          <span className="text-lg font-bold mb-4">Tags</span>
          <Link
            className="block py-2 text-sm text-gray-700 hover:bg-gray-50"
            href="#"
          >
            Inbox
          </Link>
          <Link
            className="block py-2 text-sm text-gray-700 hover:bg-gray-50"
            href="#"
          >
            Today
          </Link>
          <Link
            className="block py-2 text-sm text-gray-700 hover:bg-gray-50"
            href="#"
          >
            Upcoming
          </Link>
          <Link
            className="block py-2 text-sm text-gray-700 hover:bg-gray-50"
            href="#"
          >
            Someday
          </Link>
        </div>
      </div>
    </>
  );
}
