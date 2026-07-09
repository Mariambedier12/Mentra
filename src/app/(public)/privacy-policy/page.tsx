"use client";

import { useRouter } from "next/navigation";
import { CheckCircle2, Mail, ArrowLeft } from "lucide-react";

export default function PrivacyPolicyPage() {
  const router = useRouter();

  return (
    <div className="bg-[#FAF9F7] min-h-screen pt-32 pb-16 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-[#F1F1F1]">
        
        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-[#091A58] mb-2">
            Privacy & Policy
          </h1>
          <p className="text-xs font-semibold text-gray-400 tracking-widest uppercase">
            Last Updated: June 2026
          </p>
        </div>

        {/* INTRODUCTION */}
        <p className="text-gray-600 leading-relaxed mb-8 text-[16px]">
          At Mentra, we believe privacy is a fundamental human right, not a luxury. We are committed to protecting your personal information through extreme transparency and minimal data retention. This policy outlines how we handle the limited data you share with us to provide a high-performance productivity experience.
        </p>

        <hr className="border-[#ECECEC] my-8" />

        {/* SECTIONS */}
        <div className="space-y-10">
          
          {/* SECTION 1 */}
          <div>
            <h2 className="text-2xl font-bold text-[#091A58] mb-4">
              1. Information We Collect
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              To ensure a lightweight and secure environment, Mentra explicitly limits data collection to the absolute minimum required for account management:
            </p>
            
            <ul className="space-y-4 mb-6">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#091A58] shrink-0 mt-0.5" />
                <span className="text-gray-600 leading-relaxed">
                  <strong className="text-gray-900">Full Name:</strong> To personalize your workspace and communications.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#091A58] shrink-0 mt-0.5" />
                <span className="text-gray-600 leading-relaxed">
                  <strong className="text-gray-900">Email Address:</strong> Used for account identification and critical service notifications.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#091A58] shrink-0 mt-0.5" />
                <span className="text-gray-600 leading-relaxed">
                  <strong className="text-gray-900">Password:</strong> Stored using modern, salted cryptographic hashing. We never see your actual password.
                </span>
              </li>
            </ul>

            {/* CALLOUT */}
            <div className="bg-[#F8FAFC] rounded-2xl p-6 border border-[#E2E8F0]">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                Data Exclusion Policy
              </h3>
              <p className="text-gray-600 text-sm italic leading-relaxed">
                We do NOT collect phone numbers, payment information (processed via secure third-party providers), physical addresses, or any behavioral tracking data outside of essential app functionality.
              </p>
            </div>
          </div>

          {/* SECTION 2 */}
          <div>
            <h2 className="text-2xl font-bold text-[#091A58] mb-4">
              2. How We Use Information
            </h2>
            <p className="text-gray-600 leading-relaxed">
              The data we collect is used solely to authenticate your identity, provide access to your personal Library, and maintain the integrity of our platform. Mentra does not sell, lease, or trade your personal data to third parties for advertising or marketing purposes. Your data is your property.
            </p>
          </div>

          {/* SECTION 3 */}
          <div>
            <h2 className="text-2xl font-bold text-[#091A58] mb-4">
              3. Account Security
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We employ industry-standard encryption for data in transit (TLS) and at rest. Access to our internal systems is strictly controlled and audited. While no system is 100% secure, we continuously update our protocols to defend against emerging threats and ensure your intellectual property remains private.
            </p>
          </div>

          {/* SECTION 4 */}
          <div>
            <h2 className="text-2xl font-bold text-[#091A58] mb-4">
              4. Cookies
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Mentra uses only &quot;essential cookies&quot; to manage user sessions and keep you logged in. We do not use tracking pixels, third-party marketing cookies, or any technology designed to profile your activities across the web.
            </p>
          </div>

          {/* SECTION 5 */}
          <div>
            <h2 className="text-2xl font-bold text-[#091A58] mb-4">
              5. Changes to This Policy
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We may update this policy occasionally to reflect changes in our practices or for legal reasons. When we do, we will update the &quot;Last Updated&quot; date at the top of this page. Significant changes will be communicated via the email address associated with your account.
            </p>
          </div>

          {/* SECTION 6 */}
          <div>
            <h2 className="text-2xl font-bold text-[#091A58] mb-4">
              6. Contact Us
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              If you have questions about this Privacy Policy or how your data is handled, please reach out to our legal and security team:
            </p>

            <a
              href="mailto:privacy@mentra.ai"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition text-gray-700 font-medium text-sm shadow-sm cursor-pointer"
            >
              <Mail className="w-4 h-4 text-[#091A58]" />
              privacy@mentra.ai
            </a>
          </div>

        </div>

        <hr className="border-[#ECECEC] my-8" />

        {/* BACK BUTTON */}
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-gray-500 hover:text-[#091A58] font-bold text-md transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

      </div>
    </div>
  );
}
