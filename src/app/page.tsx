import Image from "next/image";
import Hero from "./components/hero";
import About from "./components/about";
import DataDrivenIncentives from "./components/dataDrivenIncentives";
import ImproveYourKPIs from "./components/improveYourKPIs";
import ModernMarketingStack from "./components/modernMarketingStack";
import Impact from "./components/impact";
import Media from "./components/media";
import GetStarted from "./components/getStarted";
// import Faq from "./components/faq";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import { PlatformFeatures } from "./components/PlatformFeatures";

function BlurredLines() {
  return (
    <>
      {/* <Image
        src="/hero-Illustration.svg"
        alt="Blurred Lines Background"
        width={1300}
        height={1300}
        className="absolute top-0 left-0 w-full md:min-h-screen min-h-[90vh] object-cover z-0 pointer-events-none select-none"
        priority
      /> */}
      {/* <Image
        src="/blurred-lines.jpg"
        alt="Blurred Lines Overlay"
        width={1300}
        height={1300}
        className="absolute top-0 left-0 w-full min-h-screen object-cover z-0 pointer-events-none select-none"
        priority
      /> */}
    </>
  );
}

export default function Home() {
  return (
    <div className="w-full relative min-h-screen container mx-auto px-5">
      <BlurredLines />
      <div className="flex justify-center w-full">
        <Navbar />
      </div>
      <div className="flex flex-col items-center justify-start gap-10 my-4">
        <Hero />
        {/* <div className="h-10"></div> */}
        {/* <About /> */}
      </div>
      <div className="h-10"></div>
      <PlatformFeatures />

      <GetStarted />
      {/* <div className="flex flex-col items-center justify-start gap-10 p-4 md:px-8 px-0">
        <Faq />
      </div>
      <div className="h-24"></div> */}
      <div className="flex flex-col items-center justify-start w-full">
        <Footer />
      </div>
      {/* <Image
        src="/bottom-glow.svg"
        alt="Bottom Glow"
        width={1300}
        height={1300}
        className="absolute bottom-0 left-0 w-full  h-auto z-0"
      /> */}
    </div>
  );
}
