import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function MePage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold">
        My Profile
      </h1>

      <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
        <p>
          <strong>Name:</strong>{" "}
          {session.user?.name}
        </p>

        <p className="mt-2">
          <strong>ID:</strong>{" "}
          {session.user?.id}
        </p>
      </div>
    </div>
  );
}