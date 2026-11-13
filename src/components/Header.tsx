import { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  onRequestQuote: () => void;
}

const NAV_LINKS = [
  { href: '#commodities', label: 'Commodities' },
  { href: '#how-we-work', label: 'How We Work' },
  { href: '#network', label: 'Global Network' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
];

export function Header({ onRequestQuote }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMobileNav = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-[#E4DDD3] bg-[#FAF8F5]/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-8 px-6">
        <a
          href="#top"
          className="font-display shrink-0 whitespace-nowrap text-lg font-semibold tracking-tight text-[#1C1613] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9A4306]"
        >
          E 2 I Global Trade
        </a>

        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-7 text-sm font-medium text-[#544A42] md:flex"
        >
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="shrink-0 whitespace-nowrap py-1 transition-colors duration-150 hover:text-[#1C1613] hover:underline hover:decoration-[#9A4306] hover:underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9A4306]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            onClick={onRequestQuote}
            className="hidden shrink-0 cursor-pointer whitespace-nowrap rounded-lg bg-[#1C1613] px-4 py-2 text-xs font-semibold text-[#FAF8F5] transition-colors duration-150 hover:bg-[#9A4306] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9A4306] sm:inline-flex"
          >
            Request Quote
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg border border-[#E4DDD3] text-[#1C1613] transition-colors hover:bg-[#F2EDE6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9A4306] md:hidden"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-[#E4DDD3] bg-[#FAF8F5] px-6 py-4 md:hidden">
          <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
            {NAV_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={handleMobileNav}
                className="flex min-h-[44px] items-center rounded-lg px-3 text-sm font-medium text-[#1C1613] transition-colors hover:bg-[#F2EDE6]"
              >
                {item.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onRequestQuote();
              }}
              className="mt-2 flex min-h-[44px] w-full cursor-pointer items-center justify-center rounded-lg bg-[#1C1613] px-4 py-2.5 text-sm font-semibold text-[#FAF8F5] transition-colors hover:bg-[#9A4306]"
            >
              Request Quote
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
