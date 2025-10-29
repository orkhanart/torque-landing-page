import Hero from "./components/hero";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import { PlatformFeatures } from "./components/PlatformFeatures";
import AnnouncementBanner from "./components/AnnouncementBanner";
import IncentiveExplanation from "./components/IncentiveExplanation";

export default function Home() {
  return (
    <div className="w-full relative min-h-screen container mx-auto px-0">
      <AnnouncementBanner />
      <Navbar />
      <div className="flex flex-col items-center justify-center gap-10 my-4">
        <Hero />
      </div>
      
      <div className="h-32"></div>
      <IncentiveExplanation />

      <div className="h-20"></div>
      <PlatformFeatures />

      <div className="h-16"></div>
      <div className="flex flex-col items-center justify-start w-full">
        <Footer />
      </div>
    </div>
  );
}
