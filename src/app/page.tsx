import Hero from "./components/Hero";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { PlatformFeatures } from "./components/PlatformFeatures";
import AnnouncementBanner from "./components/AnnouncementBanner";
import IncentiveExplanation from "./components/IncentiveExplanation";
import { RotatingHexagons } from "./components/RotatingHexagons";

export default function Home() {
  return (
    <>
      <Navbar />
      <RotatingHexagons />
      
      <Hero />
      
      <div className="w-full relative container mx-auto px-4 md:px-6 lg:px-8">
        <div className="h-16 md:h-28"></div>
        <IncentiveExplanation />

        <div className="h-12 md:h-18"></div>
        <PlatformFeatures />

        <div className="h-8 md:h-12"></div>
      </div>
      <Footer />
    </>
  );
}
