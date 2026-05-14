import VerifySuccessClient from "./VerifySuccessClient";

interface VerifySuccessPageProps {
  searchParams: {
    email?: string;
  };
}

export default function VerifySuccessPage({ searchParams }: VerifySuccessPageProps) {
  return <VerifySuccessClient email={searchParams.email ?? ""} />;
}
