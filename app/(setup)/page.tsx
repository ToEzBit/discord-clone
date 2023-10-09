import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initail-profile";
import { redirect } from "next/navigation";
import { InitalModal } from "@/components/modals/initial-modal";

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
  return <InitalModal />;
}

export default SetupPage;
