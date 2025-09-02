"use client";

import { deleteStartup } from "@/lib/actions";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

export default function DeleteStartupButton({ startupId }: { startupId: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = () => {
    startTransition(async () => {
      const res = await deleteStartup(startupId);
      if (res.status === "SUCCESS") {
        router.push("/"); // go back to home after deleting
      }
    });
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="bg-red-500 text-white px-4 py-2 rounded mt-4 hover:bg-red-600 disabled:opacity-50"
    >
      {isPending ? "Deleting..." : "Delete Startup"}
    </button>
  );
}
