"use client";

import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import Footer from "../_components/Footer";
import ReminderWatcher from "./_components/ReminderWatcher";
import FadeLoader from "@/components/ui/FadeLoader";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const isAuthRoute = pathname.startsWith("/auth");

  useEffect(() => {
    if (isAuthRoute) return;
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router, isAuthRoute]);

  if (isAuthRoute) {
    return (
      <>
        {children}
        <Footer variant="small" />
      </>
    );
  }

  if (status === "loading") {
    return (
      <div className="bg-[#FAF9F7] min-h-screen flex items-center justify-center">
        <FadeLoader />
      </div>
    );
  }

  if (status === "unauthenticated") {
    return null; // Prevents flashing of private children during redirect
  }

  return (
    <>
      <ReminderWatcher />
      {children}
      <Footer variant="small" />
    </>
  );
}
