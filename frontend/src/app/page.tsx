import { Hero } from '@/components/hero';
import { MintSection } from '@/components/mint-section';
import { PortfolioSection } from '@/components/portfolio-section';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <MintSection />
      <PortfolioSection />
    </main>
  );
}
