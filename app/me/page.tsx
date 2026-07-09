import { auth } from "@/auth";
import { redirect } from "next/navigation";
import "./profile.css";

export default async function MePage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
   <div className="profile-page">

    <h1 className="profile-title">
        My Profile
    </h1>

    <div className="profile-card">

        <div className="profile-row">

            <span className="profile-label">
                Name
            </span>

            <span className="profile-value">
                {session.user?.name}
            </span>

        </div>

        <div className="profile-row">

            <span className="profile-label">
                ID
            </span>

            <span className="profile-value">
                {session.user?.id}
            </span>

        </div>

    </div>

</div>
  );
}