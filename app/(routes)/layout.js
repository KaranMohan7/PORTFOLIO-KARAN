import Nav from "@/components/Nav";
import Footer from "@/components/HomeParts/Footer";

export default function RoutesLayout({ children }) {
  return (
    <>
      <div className="flex justify-end px-4 lg:px-7">
        <Nav />
      </div>
      {children}
    </>
  );
}