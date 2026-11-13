import { COMPANY_INFO } from '../data/tradeData';

export function Footer() {
  return (
    <footer className="border-t border-[#E4DDD3] bg-[#FAF8F5] py-10 text-sm text-[#544A42]">
      <div className="mx-auto flex max-w-[1200px] flex-col justify-between gap-8 px-6 md:flex-row md:items-center">
        <div>
          <p className="font-display text-lg font-semibold text-[#1C1613]">{COMPANY_INFO.name}</p>
          <p className="mt-1 text-xs text-[#6B5E53]">
            {COMPANY_INFO.meaning} · A Division of {COMPANY_INFO.parentCompany} · {COMPANY_INFO.location}
          </p>
        </div>

        <nav aria-label="Footer navigation" className="flex flex-wrap items-center gap-6 text-xs font-medium">
          <a href="#commodities" className="hover:text-[#1C1613] hover:underline underline-offset-4">
            Commodities
          </a>
          <a href="#how-we-work" className="hover:text-[#1C1613] hover:underline underline-offset-4">
            How We Work
          </a>
          <a href="#network" className="hover:text-[#1C1613] hover:underline underline-offset-4">
            Global Network
          </a>
          <a href="#about" className="hover:text-[#1C1613] hover:underline underline-offset-4">
            About
          </a>
          <a
            href={COMPANY_INFO.profilePdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#1C1613] hover:underline underline-offset-4"
          >
            Company Profile (PDF)
          </a>
        </nav>

        <div className="text-xs text-[#6B5E53] md:text-right">
          <a
            href={`mailto:${COMPANY_INFO.email}`}
            className="font-mono font-medium text-[#1C1613] hover:text-[#9A4306]"
          >
            {COMPANY_INFO.email}
          </a>
          <p className="mt-1">
            &copy; {new Date().getFullYear()} {COMPANY_INFO.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
