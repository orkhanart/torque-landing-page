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
      <div className="w-full relative container mx-auto px-4 md:px-6 lg:px-8">
        
        <div className="flex flex-col items-center justify-center gap-6 md:gap-10 my-4">
          <Hero />
        </div>
        
        <div className="h-16 md:h-32"></div>
        <IncentiveExplanation />

        <div className="h-12 md:h-20"></div>
        <PlatformFeatures />

        <div className="h-8 md:h-16"></div>
      </div>
      <Footer />
    </>
  );
}
