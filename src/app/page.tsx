import Image from "next/image";
import Hero from "./components/hero";
import About from "./components/about";
import DataDrivenIncentives from "./components/dataDrivenIncentives";
import ImproveYourKPIs from "./components/improveYourKPIs";
import ModernMarketingStack from "./components/modernMarketingStack";
import Impact from "./components/impact";
import Media from "./components/media";
import GetStarted from "./components/getStarted";
import Faq from "./components/faq";
import Footer from "./components/footer";
import Navbar from "./components/navbar";

export default function Home() {
  return (
    <div className="w-full relative top-0 min-h-screen">
      <Image 
          src="/hero-illustration.svg" 
          alt="Hero Background" 
          width={1300} 
          height={1300} 
          className="absolute top-0 left-0 w-full h-[800px] object-cover z-0" 
      />
      <Image 
          src="/overlay.svg" 
          alt="Hero Background" 
          width={1300} 
          height={1300} 
          className="absolute top-0 left-0 w-full min-h-screen object-cover z-0" 
      />
      <div className="flex justify-center w-full">
        <Navbar />
      </div>

      <div className="flex flex-col items-center justify-start gap-10 p-4 md:px-8 px-4">
        <Hero />
        <div className="h-12"></div>
        <About />
        <div className="h-8"></div>
        <DataDrivenIncentives />
        <div className="h-12"></div>
        <ImproveYourKPIs />
        <div className="h-12"></div>
        <ModernMarketingStack />
        <div className="h-12"></div>
        <Impact />
        <div className="h-12"></div>
        <Media />
        <GetStarted />
        <Faq />
        <div className="h-24"></div>
      </div>

      <div className="flex flex-col items-center justify-start w-full">
        <Footer />
      </div>

      <Image 
        src="/bottom-glow.svg" 
        alt="Bottom Glow" 
        width={1300} 
        height={1300} 
        className="absolute bottom-0 left-0 w-full  h-auto z-0" 
      />
    </div>
  );
}