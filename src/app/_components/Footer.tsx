"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import logo from "../../assets/logo2.png";
import facebook from "../../assets/facebook.png";
import gmail from "../../assets/gmail.png";
import earth from "../../assets/earth.png";

export default function Footer({ variant = "small" }) {

  const pathname = usePathname();
  if (pathname.startsWith("/quiz")) return null;

  if (variant === "big") {
    return (
      <footer className="bg-[#FAF9F7] pt-9 pb-14">

        <div className="max-w-screen-xl mx-auto px-8">
          <hr className="border-[#E2E8F0] opacity-60 mb-16" />
        </div>

        <div className="max-w-screen-xl mx-auto px-8">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

            <div>
              <Image src={logo} alt="logo" className="mb-6" />

              <p className="text-[#8C8C8C] max-w-sm leading-relaxed mb-6">
                Mentra is a productivity system built for ADHD minds,
                helping you study smarter and stay focused.
              </p>

              <div className="flex gap-4">
                <Link href="#">
                  <Image src={facebook} alt="Facebook" className="w-5 h-5" />
                </Link>

                <Link href="#">
                  <Image src={gmail} alt="Gmail" className="w-5 h-5" />
                </Link>

                <Link href="#">
                  <Image src={earth} alt="earth" className="w-5 h-5" />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-10">

              <div>
                <h3 className="font-semibold mb-6 text-[#1F1F1F]">Product</h3>
                <ul className="space-y-3 text-[#8C8C8C] text-sm">
                  <li><Link href="#">Features</Link></li>
                  <li><Link href="#">Integrations</Link></li>
                  <li><Link href="#">Mobile App</Link></li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-6 text-[#1F1F1F]">Resources</h3>
                <ul className="space-y-3 text-[#8C8C8C] text-sm">
                  <li><Link href="#">ADHD Guide</Link></li>
                  <li><Link href="#">Blog</Link></li>
                  <li><Link href="#">Help Center</Link></li>
                  <li><Link href="#">Community</Link></li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-6 text-[#1F1F1F]">Legal</h3>
                <ul className="space-y-3 text-[#8C8C8C] text-sm">
                  <li><Link href="#">Privacy</Link></li>
                  <li><Link href="#">Terms</Link></li>
                  <li><Link href="#">Accessibility</Link></li>
                  <li><Link href="#">Contact</Link></li>
                </ul>
              </div>

            </div>

          </div>

          <div className="mt-15">

            <hr className="border-[#E2E8F0] opacity-40 mb-8" />

            <div className="flex flex-col md:flex-row justify-between items-center gap-4">

              <p className="text-sm text-[#8C8C8C]">
                © 2026 Mentra. All rights reserved.
              </p>

              <div className="flex gap-6 text-sm text-[#8C8C8C]">
                <Link href="#">Privacy Policy</Link>
                <Link href="#">Cookie Settings</Link>
              </div>

            </div>

          </div>

        </div>

      </footer>
    );
  }

  return (
    <footer className="bg-[#FAF9F7] fixed bottom-0 left-0 z-20 w-full p-4 bg-neutral-primary-soft md:flex md:items-center md:justify-between md:p-6">

      <span className="pl-20 text-[#8C8C8C] text-sm text-body sm:text-center">
        © 2026{" "}
        <a href="https://flowbite.com/" className="hover:underline">
          Mentra.
        </a> All Rights Reserved.
      </span>

      <ul className="pr-20 flex flex-wrap items-center mt-3 text-sm font-medium text-body sm:mt-0">

        <li>
          <a href="#" className="text-[#8C8C8C] hover:underline me-4 md:me-6">Privacy Policy</a>
        </li>

        <li>
          <a href="#" className="text-[#8C8C8C] hover:underline">Cookie Settings</a>
        </li>
      </ul>

    </footer>
  );
}