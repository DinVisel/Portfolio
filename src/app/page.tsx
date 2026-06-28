import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BentoGrid from "@/components/BentoGrid";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-grow max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg w-full">
        <BentoGrid />
      </main>
      <Footer />
    </>
  );
}
