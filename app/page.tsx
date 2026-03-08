import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import ValueProposition from "@/components/sections/ValueProposition";
import Projects from "@/components/sections/Projects";
import About from "@/components/sections/About";
import WorkProcess from "@/components/sections/WorkProcess";
import TechStack from "@/components/sections/TechStack";
import FAQ from "@/components/sections/FAQ";
import CTAFinal from "@/components/sections/CTAFinal";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main id="main-content" role="main">
        <Hero />
        <ValueProposition />
        <Projects />
        <About />
        <WorkProcess />
        <TechStack />
        <FAQ />
        <CTAFinal />
      </main>
      <Footer />
    </>
  );
}
