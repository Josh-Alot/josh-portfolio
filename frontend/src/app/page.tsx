import { Hero } from '@/components/hero';
import { MintSection } from '@/components/mint-section';
import { PortfolioSection } from '@/components/portfolio-section';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <div className="cosmos-gradient-alt">
        <MintSection />
        <PortfolioSection />
      </div>
      <Footer />
    </main>
  );
}
