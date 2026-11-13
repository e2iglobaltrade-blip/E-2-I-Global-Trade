import { useEffect, useState, FormEvent } from 'react';
import { CheckCircle2, Copy, Download, FileText, Mail, ShieldCheck } from 'lucide-react';
import { COMMODITIES, COMPANY_INFO } from '../data/tradeData';

interface AboutAndInquirySectionProps {
  preselectedCommodity: string;
}

type CounterpartyRole = 'buyer' | 'exporter';

interface FormErrors {
  fullName?: string;
  companyName?: string;
  email?: string;
  countryOrLicense?: string;
  volume?: string;
}

interface SubmittedInquiry {
  referenceId: string;
  role: CounterpartyRole;
  fullName: string;
  companyName: string;
  email: string;
  countryOrLicense: string;
  commodity: string;
  volume: string;
  incoterm: string;
  paymentTerm: string;
  notes: string;
}

export function AboutAndInquirySection({ preselectedCommodity }: AboutAndInquirySectionProps) {
  const [role, setRole] = useState<CounterpartyRole>('buyer');
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [countryOrLicense, setCountryOrLicense] = useState('');
  const [commodity, setCommodity] = useState(COMMODITIES[0].name);
  const [volume, setVolume] = useState('');
  const [incoterm, setIncoterm] = useState('FOB Djibouti');
  const [paymentTerm, setPaymentTerm] = useState('Irrevocable Letter of Credit (LC)');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState<SubmittedInquiry | null>(null);
  const [copiedBrief, setCopiedBrief] = useState(false);

  useEffect(() => {
    if (preselectedCommodity) {
      setCommodity(preselectedCommodity);
      setSubmitted(null);
    }
  }, [preselectedCommodity]);

  const validate = (): boolean => {
    const nextErrors: FormErrors = {};
    if (!fullName.trim()) nextErrors.fullName = 'Please enter your full name.';
    if (!companyName.trim()) nextErrors.companyName = 'Please enter your company or entity name.';
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = 'Please provide a valid business email address.';
    }
    if (!countryOrLicense.trim()) {
      nextErrors.countryOrLicense =
        role === 'buyer'
          ? 'Please specify destination port or country.'
          : 'Please specify export license / ECX membership status.';
    }
    if (!volume.trim()) {
      nextErrors.volume = 'Please indicate estimated container load or metric tonnage.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!validate()) return;

    const referenceId = `E2I-${Date.now().toString().slice(-6)}`;
    setSubmitted({
      referenceId,
      role,
      fullName: fullName.trim(),
      companyName: companyName.trim(),
      email: email.trim(),
      countryOrLicense: countryOrLicense.trim(),
      commodity,
      volume: volume.trim(),
      incoterm,
      paymentTerm,
      notes: notes.trim(),
    });
    setCopiedBrief(false);
  };

  const buildBriefText = (item: SubmittedInquiry) => {
    return [
      `E 2 I Global Trade — Trade Inquiry (${item.referenceId})`,
      `Counterparty Type: ${item.role === 'buyer' ? 'International Buyer / Importer' : 'Licensed Ethiopian Exporter'}`,
      `Contact Name: ${item.fullName}`,
      `Company: ${item.companyName}`,
      `Email: ${item.email}`,
      `${item.role === 'buyer' ? 'Destination Port / Country' : 'License / ECX Status'}: ${item.countryOrLicense}`,
      `Commodity / Mandate: ${item.commodity}`,
      `Estimated Volume: ${item.volume}`,
      `Preferred Incoterm: ${item.incoterm}`,
      `Payment Instrument: ${item.paymentTerm}`,
      item.notes ? `Specifications / Notes: ${item.notes}` : '',
    ]
      .filter(Boolean)
      .join('\n');
  };

  const handleCopyBrief = async () => {
    if (!submitted) return;
    try {
      await navigator.clipboard.writeText(buildBriefText(submitted));
      setCopiedBrief(true);
      setTimeout(() => setCopiedBrief(false), 2500);
    } catch {
      setCopiedBrief(false);
    }
  };

  const mailtoHref = submitted
    ? `mailto:${COMPANY_INFO.email}?subject=${encodeURIComponent(
        `[${submitted.referenceId}] ${submitted.commodity} — ${submitted.companyName}`
      )}&body=${encodeURIComponent(buildBriefText(submitted))}`
    : `mailto:${COMPANY_INFO.email}`;

  return (
    <>
      <section id="about" className="border-b border-[#E4DDD3] bg-[#FAF8F5] py-16 lg:py-24">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="text-xs font-semibold text-[#9A4306]">
                Who We Are &amp; Institutional Backing
              </p>
              <h2 className="font-display mt-2 text-3xl font-semibold tracking-tight text-[#1C1613] sm:text-4xl [text-wrap:balance]">
                A Trusted Bridge Under Level Up General Trading PLC
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#4A4038]">
                <strong className="font-semibold text-[#1C1613]">
                  {COMPANY_INFO.name} ({COMPANY_INFO.meaning})
                </strong>{' '}
                operates as a specialized agricultural export brokerage division under{' '}
                {COMPANY_INFO.parentCompany}, headquartered in {COMPANY_INFO.location}.
              </p>

              <div className="mt-7 space-y-3 border-t border-[#E4DDD3] pt-5 text-sm text-[#4A4038]">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[#6B5E53]">Parent Organization</span>
                  <span className="font-semibold text-[#1C1613]">{COMPANY_INFO.parentCompany}</span>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <span className="shrink-0 text-[#6B5E53]">Presented &amp; Led By</span>
                  <span className="text-right font-semibold text-[#1C1613]">{COMPANY_INFO.presenter}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[#6B5E53]">Headquarters</span>
                  <span className="font-semibold text-[#1C1613]">{COMPANY_INFO.location}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[#6B5E53]">Direct Trade Desk</span>
                  <a
                    href={`mailto:${COMPANY_INFO.email}`}
                    className="font-mono text-xs font-semibold text-[#9A4306] underline underline-offset-4 hover:text-[#7D3604]"
                  >
                    {COMPANY_INFO.email}
                  </a>
                </div>
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-4">
                <a
                  href={COMPANY_INFO.profilePdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center gap-2 whitespace-nowrap rounded-lg border border-[#D4C8B8] bg-[#FFFFFF] px-4 py-2.5 text-xs font-semibold text-[#1C1613] transition-colors hover:border-[#9A4306] hover:bg-[#F5F1EB]"
                >
                  <FileText className="h-4 w-4 text-[#9A4306]" aria-hidden="true" />
                  <span>View Company Profile (PDF)</span>
                </a>
                <a
                  href={COMPANY_INFO.profilePdfUrl}
                  download="E2I-Global-Trade-Profile.pdf"
                  className="inline-flex min-h-[44px] items-center gap-1.5 whitespace-nowrap px-2 py-2 text-xs font-semibold text-[#544A42] underline decoration-[#C5B8A8] underline-offset-4 hover:text-[#1C1613]"
                >
                  <Download className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Download Deck</span>
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-7">
              <div className="rounded-xl border border-[#E4DDD3] bg-[#FFFFFF] p-6">
                <p className="font-mono text-xs font-semibold text-[#9A4306]">01 · Vision</p>
                <h3 className="font-display mt-2 text-xl font-semibold text-[#1C1613]">
                  Trusted Global Bridge
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[#4A4038]">
                  To stand as Ethiopia&apos;s leading agricultural export brokerage, linking verified
                  local producers and licensed exporters directly with reputable international
                  importers.
                </p>
              </div>

              <div className="rounded-xl border border-[#E4DDD3] bg-[#FFFFFF] p-6">
                <p className="font-mono text-xs font-semibold text-[#9A4306]">02 · Model</p>
                <h3 className="font-display mt-2 text-xl font-semibold text-[#1C1613]">
                  Zero-Inventory Growth
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[#4A4038]">
                  Operating as a pure commission agency under Level Up General Trading PLC to
                  facilitate high-value export transactions without speculative commodity inventory
                  risk.
                </p>
              </div>

              <div className="rounded-xl border border-[#E4DDD3] bg-[#FFFFFF] p-6">
                <p className="font-mono text-xs font-semibold text-[#9A4306]">03 · Protection</p>
                <h3 className="font-display mt-2 text-xl font-semibold text-[#1C1613]">
                  Strict NCNDA &amp; IMFPA
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[#4A4038]">
                  Every introduction and commercial mandate is safeguarded by binding Non-Circumvention,
                  Non-Disclosure (NCNDA) and Irrevocable Master Fee Protection (IMFPA) agreements.
                </p>
              </div>

              <div className="rounded-xl border border-[#E4DDD3] bg-[#FFFFFF] p-6">
                <p className="font-mono text-xs font-semibold text-[#9A4306]">04 · Verification</p>
                <h3 className="font-display mt-2 text-xl font-semibold text-[#1C1613]">
                  Pre-Shipment Assurance
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[#4A4038]">
                  Exporters are pre-vetted for valid licensing while buyers review pre-shipment
                  samples and confirmed grades before LC or CAD banking instruments are issued.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="bg-[#F5F1EB] py-16 lg:py-24">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="text-xs font-semibold text-[#9A4306]">Trade &amp; Sourcing Desk</p>
              <h2 className="font-display mt-2 text-3xl font-semibold tracking-tight text-[#1C1613] sm:text-4xl [text-wrap:balance]">
                Initiate a Protected Trade Mandate
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#4A4038]">
                Submit your sourcing requirements or export availability. We prepare a structured
                trade brief for direct coordination with our Addis Ababa brokerage desk.
              </p>

              <div className="mt-8 space-y-5 border-t border-[#DDD3C6] pt-6">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#1E4631]" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-semibold text-[#1C1613]">
                      Confidential NCNDA Handling
                    </p>
                    <p className="mt-1 text-sm text-[#4A4038]">
                      Supplier and buyer identities are disclosed strictly within structured deal
                      execution stages.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-[#9A4306]" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-semibold text-[#1C1613]">Direct Brokerage Email</p>
                    <a
                      href={`mailto:${COMPANY_INFO.email}`}
                      className="mt-1 inline-block font-mono text-sm font-medium text-[#9A4306] underline underline-offset-4 hover:text-[#7D3604]"
                    >
                      {COMPANY_INFO.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-xl border border-[#E4DDD3] bg-[#FFFFFF] p-6 sm:p-8">
                <div
                  role="tablist"
                  aria-label="Inquiry counterparty type"
                  className="grid grid-cols-2 gap-1 rounded-lg border border-[#E4DDD3] bg-[#F5F1EB] p-1"
                >
                  <button
                    type="button"
                    role="tab"
                    aria-selected={role === 'buyer'}
                    onClick={() => {
                      setRole('buyer');
                      setErrors({});
                      setSubmitted(null);
                    }}
                    className={`min-h-[40px] cursor-pointer whitespace-nowrap rounded-md px-3 py-2 text-xs font-semibold transition-colors ${
                      role === 'buyer'
                        ? 'bg-[#1C1613] text-[#FAF8F5]'
                        : 'text-[#544A42] hover:text-[#1C1613]'
                    }`}
                  >
                    International Buyer
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={role === 'exporter'}
                    onClick={() => {
                      setRole('exporter');
                      setErrors({});
                      setSubmitted(null);
                    }}
                    className={`min-h-[40px] cursor-pointer whitespace-nowrap rounded-md px-3 py-2 text-xs font-semibold transition-colors ${
                      role === 'exporter'
                        ? 'bg-[#1C1613] text-[#FAF8F5]'
                        : 'text-[#544A42] hover:text-[#1C1613]'
                    }`}
                  >
                    Ethiopian Exporter
                  </button>
                </div>

                {submitted ? (
                  <div className="mt-6 space-y-5">
                    <div className="flex items-start gap-3 rounded-lg border border-[#1E4631]/25 bg-[#1E4631]/5 p-4">
                      <CheckCircle2
                        className="mt-0.5 h-5 w-5 shrink-0 text-[#1E4631]"
                        aria-hidden="true"
                      />
                      <div>
                        <p className="text-sm font-semibold text-[#1C1613]">
                          Trade Brief Prepared · Reference{' '}
                          <span className="font-mono tabular-nums">{submitted.referenceId}</span>
                        </p>
                        <p className="mt-1 text-sm text-[#4A4038]">
                          Your structured inquiry is ready. Send it directly to our Addis Ababa desk
                          via email or copy the brief below for your procurement records.
                        </p>
                      </div>
                    </div>

                    <pre className="overflow-x-auto rounded-lg border border-[#E4DDD3] bg-[#FAF8F5] p-4 font-mono text-xs leading-relaxed text-[#1C1613]">
                      {buildBriefText(submitted)}
                    </pre>

                    <div className="flex flex-wrap items-center gap-3">
                      <a
                        href={mailtoHref}
                        className="inline-flex min-h-[44px] items-center gap-2 whitespace-nowrap rounded-lg bg-[#9A4306] px-5 py-2.5 text-sm font-semibold text-[#FAF8F5] transition-colors hover:bg-[#7D3604]"
                      >
                        <Mail className="h-4 w-4" aria-hidden="true" />
                        <span>Send Brief via Email</span>
                      </a>

                      <button
                        type="button"
                        onClick={handleCopyBrief}
                        className="inline-flex min-h-[44px] cursor-pointer items-center gap-2 whitespace-nowrap rounded-lg border border-[#D4C8B8] bg-[#FFFFFF] px-4 py-2.5 text-sm font-semibold text-[#1C1613] transition-colors hover:bg-[#F5F1EB]"
                      >
                        <Copy className="h-4 w-4" aria-hidden="true" />
                        <span>{copiedBrief ? 'Copied to Clipboard' : 'Copy Trade Brief'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSubmitted(null)}
                        className="min-h-[44px] cursor-pointer px-3 py-2 text-xs font-semibold text-[#544A42] underline underline-offset-4 hover:text-[#1C1613]"
                      >
                        Edit Inquiry
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="fullName"
                          className="block text-xs font-semibold text-[#1C1613]"
                        >
                          Full Name
                        </label>
                        <input
                          id="fullName"
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Samuel Bekele"
                          className="mt-1.5 w-full rounded-lg border border-[#D8CFC3] bg-[#FAF8F5] px-3.5 py-2.5 text-sm text-[#1C1613] placeholder:text-[#8E8176] focus:border-[#9A4306] focus:outline-none"
                        />
                        {errors.fullName && (
                          <p className="mt-1 text-xs font-medium text-[#B91C1C]">
                            {errors.fullName}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="companyName"
                          className="block text-xs font-semibold text-[#1C1613]"
                        >
                          Company / Trading Entity
                        </label>
                        <input
                          id="companyName"
                          type="text"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          placeholder={
                            role === 'buyer'
                              ? 'e.g. Levant Roasters & Foods LLC'
                              : 'e.g. Highland Origin Exports PLC'
                          }
                          className="mt-1.5 w-full rounded-lg border border-[#D8CFC3] bg-[#FAF8F5] px-3.5 py-2.5 text-sm text-[#1C1613] placeholder:text-[#8E8176] focus:border-[#9A4306] focus:outline-none"
                        />
                        {errors.companyName && (
                          <p className="mt-1 text-xs font-medium text-[#B91C1C]">
                            {errors.companyName}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-xs font-semibold text-[#1C1613]"
                        >
                          Business Email
                        </label>
                        <input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="procurement@company.com"
                          className="mt-1.5 w-full rounded-lg border border-[#D8CFC3] bg-[#FAF8F5] px-3.5 py-2.5 text-sm text-[#1C1613] placeholder:text-[#8E8176] focus:border-[#9A4306] focus:outline-none"
                        />
                        {errors.email && (
                          <p className="mt-1 text-xs font-medium text-[#B91C1C]">
                            {errors.email}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="countryOrLicense"
                          className="block text-xs font-semibold text-[#1C1613]"
                        >
                          {role === 'buyer'
                            ? 'Destination Port / Country'
                            : 'Export License / ECX Status'}
                        </label>
                        <input
                          id="countryOrLicense"
                          type="text"
                          value={countryOrLicense}
                          onChange={(e) => setCountryOrLicense(e.target.value)}
                          placeholder={
                            role === 'buyer'
                              ? 'e.g. Jebel Ali, UAE / Hamburg, Germany'
                              : 'e.g. Licensed Ethiopian Exporter · ECX Active'
                          }
                          className="mt-1.5 w-full rounded-lg border border-[#D8CFC3] bg-[#FAF8F5] px-3.5 py-2.5 text-sm text-[#1C1613] placeholder:text-[#8E8176] focus:border-[#9A4306] focus:outline-none"
                        />
                        {errors.countryOrLicense && (
                          <p className="mt-1 text-xs font-medium text-[#B91C1C]">
                            {errors.countryOrLicense}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="commodity"
                          className="block text-xs font-semibold text-[#1C1613]"
                        >
                          Commodity / Service Mandate
                        </label>
                        <select
                          id="commodity"
                          value={commodity}
                          onChange={(e) => setCommodity(e.target.value)}
                          className="mt-1.5 w-full rounded-lg border border-[#D8CFC3] bg-[#FAF8F5] px-3.5 py-2.5 text-sm text-[#1C1613] focus:border-[#9A4306] focus:outline-none"
                        >
                          {COMMODITIES.map((item) => (
                            <option key={item.id} value={item.name}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="volume"
                          className="block text-xs font-semibold text-[#1C1613]"
                        >
                          {role === 'buyer' ? 'Required Volume (FCL / MT)' : 'Available Stock (MT / FCL)'}
                        </label>
                        <input
                          id="volume"
                          type="text"
                          value={volume}
                          onChange={(e) => setVolume(e.target.value)}
                          placeholder="e.g. 2 x 20ft FCL (approx. 38 MT)"
                          className="mt-1.5 w-full rounded-lg border border-[#D8CFC3] bg-[#FAF8F5] px-3.5 py-2.5 text-sm text-[#1C1613] placeholder:text-[#8E8176] focus:border-[#9A4306] focus:outline-none"
                        />
                        {errors.volume && (
                          <p className="mt-1 text-xs font-medium text-[#B91C1C]">
                            {errors.volume}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="incoterm"
                          className="block text-xs font-semibold text-[#1C1613]"
                        >
                          Preferred Incoterms
                        </label>
                        <select
                          id="incoterm"
                          value={incoterm}
                          onChange={(e) => setIncoterm(e.target.value)}
                          className="mt-1.5 w-full rounded-lg border border-[#D8CFC3] bg-[#FAF8F5] px-3.5 py-2.5 text-sm text-[#1C1613] focus:border-[#9A4306] focus:outline-none"
                        >
                          <option value="FOB Djibouti">FOB Djibouti</option>
                          <option value="CIF Destination Port">CIF Destination Port</option>
                          <option value="FOB / CIF (Open to Quote)">FOB / CIF (Open to Quote)</option>
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="paymentTerm"
                          className="block text-xs font-semibold text-[#1C1613]"
                        >
                          Banking / Payment Term
                        </label>
                        <select
                          id="paymentTerm"
                          value={paymentTerm}
                          onChange={(e) => setPaymentTerm(e.target.value)}
                          className="mt-1.5 w-full rounded-lg border border-[#D8CFC3] bg-[#FAF8F5] px-3.5 py-2.5 text-sm text-[#1C1613] focus:border-[#9A4306] focus:outline-none"
                        >
                          <option value="Irrevocable Letter of Credit (LC)">
                            Irrevocable Letter of Credit (LC)
                          </option>
                          <option value="Cash Against Documents (CAD)">
                            Cash Against Documents (CAD)
                          </option>
                          <option value="LC / CAD Structured">LC / CAD Structured</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="notes" className="block text-xs font-semibold text-[#1C1613]">
                        Grade Specifications, Sample Request &amp; Timeline (Optional)
                      </label>
                      <textarea
                        id="notes"
                        rows={3}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Specify target crop grade, moisture tolerance, pre-shipment sample address, or shipment window..."
                        className="mt-1.5 w-full rounded-lg border border-[#D8CFC3] bg-[#FAF8F5] px-3.5 py-2.5 text-sm text-[#1C1613] placeholder:text-[#8E8176] focus:border-[#9A4306] focus:outline-none"
                      />
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#EFE9E0] pt-4">
                      <p className="text-xs text-[#6B5E53]">
                        Protected under NCNDA &amp; IMFPA brokerage governance.
                      </p>
                      <button
                        type="submit"
                        className="min-h-[44px] cursor-pointer whitespace-nowrap rounded-lg bg-[#9A4306] px-6 py-3 text-sm font-semibold text-[#FAF8F5] transition-colors duration-150 hover:bg-[#7D3604] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9A4306]"
                      >
                        Prepare Trade Brief
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
