import Footer from "../../_components/Footer";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Footer variant="small" />
    </>
  );
}