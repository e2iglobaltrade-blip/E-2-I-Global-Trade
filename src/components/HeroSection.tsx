import { ArrowRight } from 'lucide-react';
import { COMPANY_INFO, HERO_METRICS } from '../data/tradeData';
import { ResilientImage } from './ResilientImage';

interface HeroSectionProps {
  onInitiateInquiry: () => void;
}

export function HeroSection({ onInitiateInquiry }: HeroSectionProps) {
  return (
    <section id="top" className="border-b border-[#E4DDD3] bg-[#FAF8F5]">
      <div className="mx-auto max-w-[1200px] px-6 pt-10 pb-12 lg:pt-14 lg:pb-16">
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="flex flex-col justify-between lg:col-span-7">
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#6B5E53]">
                <span className="font-semibold text-[#9A4306]">{COMPANY_INFO.meaning}</span>
                <span aria-hidden="true">·</span>
                <span>A Division of {COMPANY_INFO.parentCompany}</span>
                <span aria-hidden="true">·</span>
                <span>{COMPANY_INFO.location}</span>
              </div>

              <h1 className="font-display mt-5 max-w-2xl text-[clamp(2.25rem,4vw,3.65rem)] leading-[1.08] font-semibold tracking-tight text-[#1C1613] [text-wrap:balance]">
                Connecting Ethiopian Agricultural Exporters With Global Buyers.
              </h1>

              <p className="mt-6 max-w-xl text-base leading-[1.65] text-[#4A4038] sm:text-lg">
                We operate as a dedicated commercial export brokerage connecting licensed Ethiopian
                coffee, oilseed, pulse, and spice exporters directly with pre-vetted international
                importers—with pre-shipment sample verification and secure FOB/CIF banking terms.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-5">
                <button
                  type="button"
                  onClick={onInitiateInquiry}
                  className="inline-flex min-h-[44px] cursor-pointer items-center gap-2.5 whitespace-nowrap rounded-lg bg-[#9A4306] px-6 py-3 text-sm font-semibold text-[#FAF8F5] transition-colors duration-150 hover:bg-[#7D3604] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9A4306]"
                >
                  <span>Initiate Trade Inquiry</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>

                <a
                  href="#commodities"
                  className="inline-flex min-h-[44px] items-center whitespace-nowrap px-2 py-2 text-sm font-semibold text-[#1C1613] underline decoration-[#C5B8A8] underline-offset-4 transition-colors duration-150 hover:decoration-[#9A4306]"
                >
                  Browse Export Catalogue
                </a>
              </div>
            </div>

            <div className="mt-10 border-t border-[#E4DDD3] pt-5 text-xs text-[#6B5E53]">
              <span>Zero-Inventory Commission Brokerage</span>
              <span className="mx-2" aria-hidden="true">·</span>
              <span>Pre-Shipment Quality Checks</span>
              <span className="mx-2" aria-hidden="true">·</span>
              <span>LC &amp; CAD Settlement Structures</span>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative h-72 overflow-hidden rounded-xl border border-[#E4DDD3] bg-[#1C1613] sm:h-96 lg:h-full lg:min-h-[460px]">
              <ResilientImage
                src="/assets/media/coffee-drying-beds.jpg"
                alt="Ethiopian highland raised drying beds processing sun-dried coffee cherries"
                title="Ethiopian Highland Harvests"
                className="h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1C1613]/85 via-[#1C1613]/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-[#FAF8F5]">
                <p className="text-xs font-medium text-[#E7D8C9]">
                  Direct Origin Sourcing · Ethiopia
                </p>
                <p className="font-display mt-1 text-lg font-medium leading-snug">
                  Export-ready harvests vetted before contract execution.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-[#E4DDD3] bg-[#E4DDD3] sm:grid-cols-2 lg:grid-cols-4">
          {HERO_METRICS.map((metric) => (
            <div key={metric.label} className="bg-[#F5F1EB] p-5">
              <p className="font-mono text-lg font-semibold tracking-tight text-[#1C1613] tabular-nums">
                {metric.value}
              </p>
              <p className="mt-1.5 text-sm font-semibold text-[#1C1613]">{metric.label}</p>
              <p className="mt-1 text-xs leading-relaxed text-[#5C5147]">{metric.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
