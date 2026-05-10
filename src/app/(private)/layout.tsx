import Footer from "../_components/Footer";
import ReminderWatcher from "./_components/ReminderWatcher";


export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ReminderWatcher />
      {children}
      <Footer variant="small" />
    </>
  );
}