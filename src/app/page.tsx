import Hero from "./components/Hero";
import GrowthStack from "./components/GrowthStack";
import Solutions from "./components/Solutions";
import PlaybooksSection from "./components/PlaybooksSection";
import HomepageCTA from "./components/HomepageCTA";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <Hero />

      {/* Platform Features */}
      <GrowthStack />

      {/* Solutions */}
      <Solutions />

      {/* Playbooks */}
      <PlaybooksSection />

      {/* CTA */}
      <HomepageCTA />

      {/* Footer */}
      <Footer />
    </>
  );
}
