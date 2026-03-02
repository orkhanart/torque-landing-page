import Hero from "./components/Hero";
import GrowthStack from "./components/GrowthStack";
import Solutions from "./components/Solutions";
import PlaybooksSection from "./components/PlaybooksSection";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />

      {/* Main content — sits above the fixed footer */}
      <div className="relative z-10 bg-background">
        {/* Hero */}
        <Hero />

        {/* Platform Features */}
        <GrowthStack />

        {/* Solutions */}
        <Solutions />

        {/* Playbooks */}
        <PlaybooksSection />
      </div>

      {/* Footer — fixed behind content, revealed on scroll */}
      <div className="h-screen" />
      <Footer />
    </>
  );
}
