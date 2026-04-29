import Footer from "../_components/Footer";
import Navbar from "../_components/Navbar";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>

      {children}
      <Footer variant="big" />
    </>
  );
}