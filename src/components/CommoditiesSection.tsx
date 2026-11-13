import { useState } from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
import { COMMODITIES, CommodityCategory, CommodityItem } from '../data/tradeData';
import { ResilientImage } from './ResilientImage';

interface CommoditiesSectionProps {
  onSelectCommodityForQuote: (commodityName: string) => void;
}

type FilterOption = 'all' | CommodityCategory;

const FILTER_TABS: { id: FilterOption; label: string }[] = [
  { id: 'all', label: 'All Offerings' },
  { id: 'cash-crops', label: 'Cash Crops & Spices' },
  { id: 'oilseeds-pulses', label: 'Oilseeds & Pulses' },
  { id: 'services', label: 'Brokerage Services' },
];

export function CommoditiesSection({ onSelectCommodityForQuote }: CommoditiesSectionProps) {
  const [activeFilter, setActiveFilter] = useState<FilterOption>('all');
  const [selectedItem, setSelectedItem] = useState<CommodityItem>(COMMODITIES[0]);

  const filteredItems =
    activeFilter === 'all'
      ? COMMODITIES
      : COMMODITIES.filter((item) => item.category === activeFilter);

  const handleFilterChange = (filter: FilterOption) => {
    setActiveFilter(filter);
    const nextList =
      filter === 'all' ? COMMODITIES : COMMODITIES.filter((item) => item.category === filter);
    if (nextList.length > 0 && !nextList.some((i) => i.id === selectedItem.id)) {
      setSelectedItem(nextList[0]);
    }
  };

  return (
    <section id="commodities" className="border-b border-[#E4DDD3] bg-[#FAF8F5] py-16 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="flex flex-col justify-between gap-6 border-b border-[#E4DDD3] pb-8 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold text-[#9A4306]">Core Export Portfolio</p>
            <h2 className="font-display mt-2 text-3xl font-semibold tracking-tight text-[#1C1613] sm:text-4xl [text-wrap:balance]">
              Ethiopian Agricultural Commodities &amp; Brokerage Services
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="Commodity categories"
            className="flex flex-wrap items-center gap-1 rounded-lg border border-[#E4DDD3] bg-[#F2EDE6] p-1"
          >
            {FILTER_TABS.map((tab) => {
              const isActive = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => handleFilterChange(tab.id)}
                  className={`min-h-[38px] cursor-pointer whitespace-nowrap rounded-md px-3.5 py-1.5 text-xs font-semibold transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9A4306] ${
                    isActive
                      ? 'bg-[#1C1613] text-[#FAF8F5]'
                      : 'text-[#544A42] hover:text-[#1C1613]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-7">
            {filteredItems.map((item, idx) => {
              const isSelected = selectedItem.id === item.id;
              const isMarquee = activeFilter === 'all' && idx === 0;

              return (
                <article
                  key={item.id}
                  className={`flex flex-col overflow-hidden rounded-xl border transition-colors duration-150 ${
                    isMarquee ? 'sm:col-span-2' : ''
                  } ${
                    isSelected
                      ? 'border-[#9A4306] bg-[#FFFFFF]'
                      : 'border-[#E4DDD3] bg-[#FFFFFF] hover:border-[#C5B8A8]'
                  }`}
                >
                  <div className={`relative overflow-hidden bg-[#2B211B] ${isMarquee ? 'h-60' : 'h-44'}`}>
                    <ResilientImage
                      src={item.image}
                      alt={item.imageAlt}
                      title={item.name}
                      className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.02]"
                    />
                  </div>

                  <div className="flex flex-1 flex-col justify-between p-5">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-[#6B5E53]">
                        <span>{item.categoryLabel}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono font-medium text-[#9A4306] tabular-nums">
                          {item.commissionBand}
                        </span>
                      </div>

                      <h3 className="font-display mt-2 text-xl font-semibold tracking-tight text-[#1C1613]">
                        {item.name}
                      </h3>

                      <p className="mt-2 text-sm leading-relaxed text-[#4A4038]">
                        {item.summary}
                      </p>
                    </div>

                    <div className="mt-5 flex items-center justify-between gap-4 border-t border-[#EFE9E0] pt-4">
                      <button
                        type="button"
                        onClick={() => setSelectedItem(item)}
                        className="cursor-pointer whitespace-nowrap text-xs font-semibold text-[#1C1613] underline decoration-[#C5B8A8] underline-offset-4 transition-colors hover:decoration-[#9A4306]"
                      >
                        {isSelected ? 'Inspecting Specifications' : 'Inspect Specifications'}
                      </button>

                      <button
                        type="button"
                        onClick={() => onSelectCommodityForQuote(item.name)}
                        className="inline-flex cursor-pointer items-center gap-1 whitespace-nowrap text-xs font-semibold text-[#9A4306] transition-colors hover:text-[#7D3604]"
                      >
                        <span>Request Quote</span>
                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <aside className="lg:col-span-5">
            <div className="sticky top-24 rounded-xl border border-[#E4DDD3] bg-[#F5F1EB] p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#6B5E53]">
                <span>Selected Trade Sheet</span>
                <span className="font-mono font-semibold text-[#9A4306] tabular-nums">
                  {selectedItem.commissionBand}
                </span>
              </div>

              <h3 className="font-display mt-3 text-2xl font-semibold tracking-tight text-[#1C1613]">
                {selectedItem.name}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-[#4A4038]">
                {selectedItem.summary}
              </p>

              <div className="mt-6 space-y-5 border-t border-[#E4DDD3] pt-5">
                <div>
                  <h4 className="text-xs font-semibold text-[#6B5E53]">
                    Primary Varieties &amp; Scope
                  </h4>
                  <ul className="mt-2.5 space-y-2">
                    {selectedItem.varieties.map((variety) => (
                      <li
                        key={variety}
                        className="flex items-start gap-2.5 text-sm font-medium text-[#1C1613]"
                      >
                        <Check
                          className="mt-0.5 h-4 w-4 shrink-0 text-[#1E4631]"
                          aria-hidden="true"
                        />
                        <span>{variety}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-[#E4DDD3] pt-4">
                  <h4 className="text-xs font-semibold text-[#6B5E53]">
                    Contract &amp; Banking Structure
                  </h4>
                  <p className="mt-1.5 font-mono text-xs leading-relaxed text-[#1C1613] tabular-nums">
                    {selectedItem.terms}
                  </p>
                </div>

                <div className="border-t border-[#E4DDD3] pt-4">
                  <h4 className="text-xs font-semibold text-[#6B5E53]">
                    Quality &amp; Sample Protocol
                  </h4>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#4A4038]">
                    {selectedItem.verification}
                  </p>
                </div>

                <div className="border-t border-[#E4DDD3] pt-4">
                  <h4 className="text-xs font-semibold text-[#6B5E53]">
                    Active Import Corridors
                  </h4>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#1C1613]">
                    {selectedItem.exportMarkets.join(' · ')}
                  </p>
                </div>
              </div>

              <div className="mt-7">
                <button
                  type="button"
                  onClick={() => onSelectCommodityForQuote(selectedItem.name)}
                  className="flex min-h-[44px] w-full cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-[#1C1613] px-5 py-3 text-sm font-semibold text-[#FAF8F5] transition-colors duration-150 hover:bg-[#9A4306] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9A4306]"
                >
                  <span>Inquire About {selectedItem.name.split(' ')[0]} Lots</span>
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
