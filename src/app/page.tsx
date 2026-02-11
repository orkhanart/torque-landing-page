import HeroV2 from "./components/HeroV2";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />

      {/* Section 1: Hero & Trust */}
      <HeroV2 />

      {/* Footer */}
      <Footer />
    </>
  );
}
