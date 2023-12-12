"use client";
import Image from "next/image";
import { useSession } from "next-auth/react";
export default function Home() {
  const { data: session } = useSession();
  const image = session ? session.user.image : "";
  return (
    <>
      <Image alt="pfp" src={image} width={200} height={200} />
    </>
  );
}
