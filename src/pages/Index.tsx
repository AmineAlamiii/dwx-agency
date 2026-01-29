import AnimatedBackground from '@/components/ui/AnimatedBackground';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import CaseStudies from '@/components/sections/CaseStudies';
import Process from '@/components/sections/Process';
import About from '@/components/sections/About';
import Contact from '@/components/sections/Contact';
import CTABanner from '@/components/sections/CTABanner';
import Testimonials from '@/components/sections/Testimonials';
import Pricing from '@/components/sections/Pricing';
import FAQ from '@/components/sections/FAQ';

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-foreground selection:bg-primary/30 selection:text-primary">
      <AnimatedBackground />
      <Header />
      <main>
        <Hero />
        <Services />
        <About />
        <CaseStudies />
        <Process />
        <Testimonials />
        <Pricing />
        <FAQ />
        <Contact />
        <CTABanner />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
