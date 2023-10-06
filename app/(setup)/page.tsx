import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initail-profile";
import { redirect } from "next/navigation";

async function SetupPage() {
  const profile = await initialProfile();

  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (server) {
    return redirect(`/servers/${server.id}`);
  }
  return <div>Create a Server</div>;
}

export default SetupPage;
