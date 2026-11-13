import { useState } from 'react';
import { CHALLENGE_SOLUTIONS, DEAL_STAGES } from '../data/tradeData';
import { ResilientImage } from './ResilientImage';

export function ExecutionSection() {
  const [activeStage, setActiveStage] = useState(0);
  const currentStage = DEAL_STAGES[activeStage];

  return (
    <section id="how-we-work" className="border-b border-[#E4DDD3] bg-[#F5F1EB] py-16 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            <p className="text-xs font-semibold text-[#9A4306]">
              Market Gaps in Agricultural Exports
            </p>
            <h2 className="font-display mt-2 text-3xl font-semibold tracking-tight text-[#1C1613] sm:text-4xl [text-wrap:balance]">
              The Challenge &amp; How E 2 I Solves It
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-[#4A4038]">
              Cross-border agricultural trade breaks down when suppliers, quality grading, and
              banking terms are unverified. We step in as a neutral commercial intermediary to
              remove friction on both sides.
            </p>

            <div className="mt-8 divide-y divide-[#DDD3C6] border-y border-[#DDD3C6]">
              {CHALLENGE_SOLUTIONS.map((item) => (
                <div key={item.number} className="py-6">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-sm font-semibold text-[#9A4306] tabular-nums">
                      {item.number}.
                    </span>
                    <h3 className="font-display text-xl font-semibold tracking-tight text-[#1C1613]">
                      {item.title}
                    </h3>
                  </div>

                  <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <p className="text-xs font-semibold text-[#6B5E53]">Market Gap</p>
                      <p className="mt-1 text-sm leading-relaxed text-[#4A4038]">
                        {item.challenge}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#1E4631]">How We Help</p>
                      <p className="mt-1 text-sm font-medium leading-relaxed text-[#1C1613]">
                        {item.solution}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-between gap-8 lg:col-span-6">
            <div className="overflow-hidden rounded-xl border border-[#E4DDD3] bg-[#FFFFFF]">
              <div className="h-64 overflow-hidden bg-[#1C1613] sm:h-72">
                <ResilientImage
                  src="/assets/media/field-handshake.jpg"
                  alt="Agricultural trade partnership handshake in front of green crop fields"
                  title="Verified Exporter & Buyer Matchmaking"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="p-6 sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-xs font-semibold text-[#9A4306]">
                    Protected Deal Execution Workflow
                  </p>
                  <span className="font-mono text-xs text-[#6B5E53] tabular-nums">
                    Stage {currentStage.stage} of 04
                  </span>
                </div>

                <div
                  role="tablist"
                  aria-label="Deal execution stages"
                  className="mt-4 grid grid-cols-4 gap-2"
                >
                  {DEAL_STAGES.map((stage, index) => {
                    const isSelected = index === activeStage;
                    return (
                      <button
                        key={stage.stage}
                        type="button"
                        role="tab"
                        aria-selected={isSelected}
                        onClick={() => setActiveStage(index)}
                        className={`min-h-[40px] cursor-pointer rounded-lg border px-2 py-2 text-center font-mono text-xs font-semibold transition-colors duration-150 tabular-nums focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9A4306] ${
                          isSelected
                            ? 'border-[#1C1613] bg-[#1C1613] text-[#FAF8F5]'
                            : 'border-[#E4DDD3] bg-[#FAF8F5] text-[#544A42] hover:border-[#C5B8A8] hover:text-[#1C1613]'
                        }`}
                      >
                        {stage.stage}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-6 border-t border-[#EFE9E0] pt-5">
                  <h3 className="font-display text-xl font-semibold tracking-tight text-[#1C1613]">
                    {currentStage.stage}. {currentStage.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-[#4A4038]">
                    {currentStage.summary}
                  </p>
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-lg bg-[#F5F1EB] px-4 py-3">
                    <span className="text-xs font-semibold text-[#6B5E53]">Key Deliverable</span>
                    <span className="font-mono text-xs font-medium text-[#1C1613]">
                      {currentStage.deliverable}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
