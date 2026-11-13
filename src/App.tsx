/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { CommoditiesSection } from './components/CommoditiesSection';
import { ExecutionSection } from './components/ExecutionSection';
import { NetworkSection } from './components/NetworkSection';
import { AboutAndInquirySection } from './components/AboutAndInquirySection';
import { Footer } from './components/Footer';
import { COMMODITIES } from './data/tradeData';

export default function App() {
  const [preselectedCommodity, setPreselectedCommodity] = useState<string>(COMMODITIES[0].name);

  const scrollToInquiry = (commodityName?: string) => {
    if (commodityName) {
      setPreselectedCommodity(commodityName);
    }
    const target = document.getElementById('contact');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1613]">
      <Header onRequestQuote={() => scrollToInquiry()} />

      <main>
        <HeroSection onInitiateInquiry={() => scrollToInquiry()} />
        <CommoditiesSection
          onSelectCommodityForQuote={(commodityName) => scrollToInquiry(commodityName)}
        />
        <ExecutionSection />
        <NetworkSection />
        <AboutAndInquirySection preselectedCommodity={preselectedCommodity} />
      </main>

      <Footer />
    </div>
  );
}
