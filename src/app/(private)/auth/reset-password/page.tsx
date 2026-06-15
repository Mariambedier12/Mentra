import ResetPasswordClient from "./ResetPasswordClient";

interface ResetPasswordPageProps {
  searchParams: {
    email?: string;
  };
}

export default function ResetPasswordPage({ searchParams }: ResetPasswordPageProps) {
  return <ResetPasswordClient emailParam={searchParams.email ?? ""} />;
}
