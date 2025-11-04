import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import About from "../components/About";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex items-center justify-center">
        <p className="text-2xl">Coming Soon...</p>
      </main>
      <Footer />
    </div>
  );
}

