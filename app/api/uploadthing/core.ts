import { auth } from "@clerk/nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const handlerAuth = () => {
  const { userId } = auth();
  if (!userId) throw new Error("Unauthorized");
  return { userId: userId };
};

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  serverImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(() => handlerAuth())
    .onUploadComplete(() => {}),
  messageFile: f(["image", "pdf"])
    .middleware(() => handlerAuth())
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
