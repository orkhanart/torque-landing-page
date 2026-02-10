import HeroV2 from "./components/HeroV2";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import EcosystemSignal from "./components/EcosystemSignal";
import TrustBar from "./components/TrustBar";
import DataTruth from "./components/DataTruth";
import GrowthStack from "./components/GrowthStack";
import Solutions from "./components/Solutions";
import FeaturedPlaybookFlow from "./components/FeaturedPlaybookFlow";
import HomepageCTA from "./components/HomepageCTA";

export default function Home() {
  return (
    <>
      <Navbar />

      {/* Section 1: Hero & Trust */}
      <HeroV2 />
      <TrustBar />

      <div className="w-full relative">
        {/* Section 2: The Data Truth (Problem vs. Proof) */}
        <DataTruth />

        {/* Section 3: The Growth Stack (Product Showcase) */}
        <GrowthStack />

        {/* Section 4: Solutions (Sector Specifics) */}
        <Solutions />

        {/* Section 5: Featured Playbook (The Action) */}
        <FeaturedPlaybookFlow />

        {/* Section 6: Homepage CTA */}
        <HomepageCTA />
      </div>

      {/* Section 7: Footer */}
      <Footer />
    </>
  );
}
