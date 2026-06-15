import VerifyOtpClient from "./VerifyOtpClient";

interface VerifyOtpPageProps {
  searchParams: {
    email?: string;
  };
}

export default function VerifyOtpPage({ searchParams }: VerifyOtpPageProps) {
  return <VerifyOtpClient emailParam={searchParams.email ?? ""} />;
}
