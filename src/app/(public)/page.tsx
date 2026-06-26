"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Header from "../_components/Header"
import Focus from "../_components/Focus"
import Laptop from "../_components/Laptop"
import Works from "../_components/Works";
import Insight from "../_components/Insight";
import Choose from "../_components/Choose";

export default function Home() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/upload");
    }
  }, [status, router]);

  if (status === "authenticated") {
    return null; // Prevents landing page flicker before redirect
  }

  return (
    <>
      <Header />
      <Focus />
      <Laptop />
      <Works />
      <Insight />
      <Choose />
    </>
  );
}
