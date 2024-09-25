// import Image from "next/image";
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
    <div className="flex flex-col items-center justify-center min-h-screen gap-10 p-4 px-8 pb-24">
      <Navbar />
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
      <div className="h-12"></div>
      <GetStarted />
      <div className="h-12"></div>
      <Faq />
      <div className="h-12"></div>

      <Footer />
    </div>
  );
}
