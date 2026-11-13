import { useState } from 'react';
import { Globe2 } from 'lucide-react';
import { NetworkRegionId, TRADE_CORRIDORS } from '../data/tradeData';
import { ResilientImage } from './ResilientImage';

const REGION_FILTERS: { id: NetworkRegionId; label: string }[] = [
  { id: 'all', label: 'All Corridors' },
  { id: 'mena', label: 'Middle East & MENA' },
  { id: 'europe', label: 'Europe' },
  { id: 'asia-americas', label: 'Asia-Pacific & US' },
];

export function NetworkSection() {
  const [selectedRegion, setSelectedRegion] = useState<NetworkRegionId>('all');

  const visibleCorridors =
    selectedRegion === 'all'
      ? TRADE_CORRIDORS
      : TRADE_CORRIDORS.filter((corridor) => corridor.region === selectedRegion);

  return (
    <section id="network" className="border-b border-[#2E251F] bg-[#1C1613] py-16 text-[#FAF8F5] lg:py-24">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="flex flex-col justify-between gap-6 border-b border-[#342A23] pb-8 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.01em] text-[#E5984B]">
              Our Global Network
            </p>
            <h2 className="font-display mt-2 text-3xl font-semibold tracking-tight text-[#FAF8F5] sm:text-4xl [text-wrap:balance]">
              Container-Load Export Corridors Across Four Continents
            </h2>
            <p className="mt-3 text-base leading-relaxed tracking-[0.01em] text-[#D7CCC2]">
              We connect Ethiopia&apos;s harvests with pre-vetted food processors, specialty coffee
              roasters, and bulk commodity traders across high-demand import hubs.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Global trade corridors"
            className="flex flex-wrap items-center gap-1 rounded-lg border border-[#3A2E27] bg-[#261E1A] p-1"
          >
            {REGION_FILTERS.map((region) => {
              const active = selectedRegion === region.id;
              return (
                <button
                  key={region.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSelectedRegion(region.id)}
                  className={`min-h-[38px] cursor-pointer whitespace-nowrap rounded-md px-3.5 py-1.5 text-xs font-semibold transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E5984B] ${
                    active
                      ? 'bg-[#9A4306] text-[#FAF8F5]'
                      : 'text-[#D7CCC2] hover:text-[#FAF8F5]'
                  }`}
                >
                  {region.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
          <div className="flex flex-col justify-between gap-5 lg:col-span-7">
            {visibleCorridors.map((corridor) => (
              <div
                key={corridor.id}
                className="rounded-xl border border-[#342A23] bg-[#241D19] p-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#C7B9AC]">
                  <span className="inline-flex items-center gap-2 font-semibold text-[#E5984B]">
                    <Globe2 className="h-4 w-4" aria-hidden="true" />
                    <span>{corridor.regionLabel}</span>
                  </span>
                  <span>{corridor.commodityGroup}</span>
                </div>

                <p className="mt-3 text-base font-medium leading-relaxed tracking-[0.01em] text-[#FAF8F5]">
                  {corridor.countries.join(' · ')}
                </p>

                <p className="mt-3 border-t border-[#342A23] pt-3 text-sm tracking-[0.01em] text-[#C7B9AC]">
                  Target Counterparties: {corridor.buyerProfiles}
                </p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-6 lg:col-span-5">
            <div className="relative min-h-[260px] overflow-hidden rounded-xl border border-[#342A23] bg-[#241D19]">
              <ResilientImage
                src="/assets/media/port-containers.jpg"
                alt="International container shipping terminal at sunset"
                title="Container-Load Maritime Dispatch"
                className="h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1C1613]/85 via-[#1C1613]/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="text-xs font-medium text-[#E5984B]">
                  Container-Load Maritime Dispatch
                </p>
                <p className="mt-1 text-sm font-medium text-[#FAF8F5]">
                  FOB &amp; CIF sea-freight coordination under international banking terms.
                </p>
              </div>
            </div>

            <div className="relative min-h-[220px] overflow-hidden rounded-xl border border-[#342A23] bg-[#241D19]">
              <ResilientImage
                src="/assets/media/global-network.jpg"
                alt="Global trade route connections linking Africa, Europe, the Middle East, Asia, and the Americas"
                title="Active International Trade Routes"
                className="h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1C1613]/85 via-[#1C1613]/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="text-xs font-medium text-[#E5984B]">
                  Cross-Border Trade Hubs
                </p>
                <p className="mt-1 text-sm font-medium text-[#FAF8F5]">
                  Middle East · Europe · South &amp; East Asia · North America
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
