import { auth } from "@/auth";
import { redirect } from "next/navigation";


const session = await auth();

if (!session) {
  redirect("/login");
}

export default function MePage() {
  return (
    <div>
      <h1>My Profile</h1>
    </div>
  );
}