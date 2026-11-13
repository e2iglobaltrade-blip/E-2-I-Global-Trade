export type CommodityCategory = 'cash-crops' | 'oilseeds-pulses' | 'services';

export interface CommodityItem {
  id: string;
  name: string;
  category: CommodityCategory;
  categoryLabel: string;
  commissionBand: string;
  image: string;
  imageAlt: string;
  summary: string;
  varieties: string[];
  exportMarkets: string[];
  terms: string;
  verification: string;
  featured?: boolean;
}

export interface ChallengeSolutionItem {
  number: string;
  title: string;
  challenge: string;
  solution: string;
}

export interface DealStage {
  stage: string;
  title: string;
  summary: string;
  deliverable: string;
}

export type NetworkRegionId = 'all' | 'mena' | 'europe' | 'asia-americas';

export interface TradeCorridor {
  id: string;
  region: Exclude<NetworkRegionId, 'all'>;
  regionLabel: string;
  commodityGroup: string;
  countries: string[];
  buyerProfiles: string;
}

export const COMPANY_INFO = {
  name: 'E 2 I Global Trade',
  meaning: 'Export 2 Import Global Trade',
  parentCompany: 'Level Up General Trading PLC',
  role: 'Agricultural Export Brokerage',
  location: 'Addis Ababa, Ethiopia',
  email: 'e2iglobaltrade@gmail.com',
  presenter: 'Betlhem Tewodros & Dagimawi Daniel',
  profilePdfUrl: '/assets/aistudio/e2i_gt_2_1f3759d9.pdf',
};

export const HERO_METRICS = [
  {
    value: '2% – 4%',
    label: 'Cash Crops & Spices Commission',
    detail: 'Coffee, turmeric, ginger, korarima, black cumin',
  },
  {
    value: '2% – 5%',
    label: 'Oilseeds & Pulses Commission',
    detail: 'Humera & Wollega sesame, niger seeds, lentils, beans',
  },
  {
    value: 'FOB / CIF',
    label: 'Structured Banking Terms',
    detail: 'Executed via Irrevocable LC and CAD instruments',
  },
  {
    value: 'NCNDA · IMFPA',
    label: 'Protected Commission Mandate',
    detail: 'Zero-inventory brokerage backed by Level Up PLC',
  },
];

export const COMMODITIES: CommodityItem[] = [
  {
    id: 'ethiopian-coffee',
    name: 'Specialty & Commercial Coffee',
    category: 'cash-crops',
    categoryLabel: 'Cash Crops & Spices',
    commissionBand: '2% – 4% Commission',
    image: '/assets/media/coffee-cherries.jpg',
    imageAlt: 'Ripe red Ethiopian coffee cherries alongside roasted coffee beans',
    summary:
      'Direct brokerage connecting licensed Ethiopian washed and natural coffee exporters with international roasters and green-bean importers.',
    varieties: ['Specialty Arabica Lots', 'Washed & Natural Commercial Grades', 'Pre-Shipment Cupping Samples'],
    exportMarkets: ['Saudi Arabia', 'UAE', 'Germany', 'Netherlands', 'Italy', 'Switzerland', 'United States', 'South Korea', 'Japan', 'China'],
    terms: 'FOB Djibouti or CIF Destination · Irrevocable LC / CAD',
    verification: 'Pre-shipment green bean samples & ECX/exporter grade verification prior to contract execution',
    featured: true,
  },
  {
    id: 'oilseeds-sesame',
    name: 'Humera & Wollega Sesame & Niger Seeds',
    category: 'oilseeds-pulses',
    categoryLabel: 'Oilseeds & Pulses',
    commissionBand: '2% – 5% Commission',
    image: '/assets/media/sesame-bowl.jpg',
    imageAlt: 'Golden Ethiopian sesame seeds in a wooden bowl resting on burlap',
    summary:
      'Container-load sourcing of high-purity Humera whitish sesame, Wollega sesame, and Ethiopian niger seeds for tahini, oil, and food processors.',
    varieties: ['Humera Sesame Seed', 'Wollega Sesame Seed', 'Niger Seed'],
    exportMarkets: ['China', 'India', 'Israel', 'Turkey', 'Egypt', 'Sudan', 'UAE', 'EU', 'United States'],
    terms: 'FOB / CIF Container Loads · LC / CAD Banking',
    verification: 'Moisture, purity, and pre-shipment lab sample coordination before loading',
  },
  {
    id: 'spices-botanicals',
    name: 'Turmeric, Ginger, Korarima & Spices',
    category: 'cash-crops',
    categoryLabel: 'Cash Crops & Spices',
    commissionBand: '2% – 4% Commission',
    image: '/assets/media/cargo-vessel.jpg',
    imageAlt: 'Bulk cargo vessel and container cranes at port at sunrise',
    summary:
      'Export-ready Ethiopian botanicals and spices sourced from vetted commercial suppliers for culinary manufacturers and spice wholesalers.',
    varieties: ['Turmeric', 'Ginger', 'Korarima (Ethiopian Cardamom)', 'Black Cumin', 'Fenugreek'],
    exportMarkets: ['UAE', 'Saudi Arabia', 'Egypt', 'Sudan', 'India', 'Turkey', 'EU', 'United States'],
    terms: 'FOB / CIF Bulk Container · LC / CAD',
    verification: 'Pre-shipment sample dispatch & grade inspection aligned with buyer specs',
  },
  {
    id: 'pulses-lentils',
    name: 'Chickpeas, Red Lentils & Kidney Beans',
    category: 'oilseeds-pulses',
    categoryLabel: 'Oilseeds & Pulses',
    commissionBand: '2% – 5% Commission',
    image: '/assets/media/pulses-sacks.jpg',
    imageAlt: 'Burlap sacks filled with red kidney beans, red lentils, green mung beans, and chickpeas',
    summary:
      'Consistent bulk sourcing of Ethiopian pulses and legumes vetted for size, cleanliness, and export documentation compliance.',
    varieties: ['Chickpeas', 'Red Lentils', 'Kidney Beans', 'Field Peas'],
    exportMarkets: ['India', 'Pakistan', 'Bangladesh', 'UAE', 'Saudi Arabia', 'Egypt', 'Sudan', 'Yemen', 'Netherlands', 'Belgium', 'Germany', 'Italy', 'Indonesia', 'Vietnam'],
    terms: 'FOB / CIF Full Container Load · LC / CAD',
    verification: 'Pre-shipment sample verification and licensed exporter documentation review',
  },
  {
    id: 'matchmaking-facilitation',
    name: 'Buyer-Exporter Matchmaking & Deal Facilitation',
    category: 'services',
    categoryLabel: 'Brokerage Services',
    commissionBand: 'Zero Inventory Risk',
    image: '/assets/media/contract-handshake.jpg',
    imageAlt: 'International trade partners shaking hands over signed export contract documents',
    summary:
      'End-to-end commercial intermediary services connecting pre-vetted global importers with licensed Ethiopian suppliers under strict NCNDA and IMFPA protection.',
    varieties: ['Licensed Supplier Vetting', 'Pre-Shipment Sample Coordination', 'FOB/CIF & LC/CAD Structuring'],
    exportMarkets: ['Middle East & MENA', 'Europe', 'South & East Asia', 'North America'],
    terms: 'Pure Commission Agency · NCNDA & IMFPA Protected',
    verification: 'Backed by Level Up General Trading PLC with strict compliance and document oversight',
  },
];

export const CHALLENGE_SOLUTIONS: ChallengeSolutionItem[] = [
  {
    number: '01',
    title: 'Market Access & Sourcing Gaps',
    challenge:
      'Ethiopian exporters face high international marketing costs, while global importers lack reliable access to verified local suppliers.',
    solution:
      'We connect pre-vetted international buyers directly with licensed, export-ready Ethiopian producers and shippers.',
  },
  {
    number: '02',
    title: 'Quality & Verification Risks',
    challenge:
      'Importers worry about inconsistent crop grades across lots, while exporters face costly post-shipment quality disputes.',
    solution:
      'We coordinate pre-shipment physical samples and independent grade verification before contracts are executed.',
  },
  {
    number: '03',
    title: 'Payment & Contract Friction',
    challenge:
      'Cross-border agricultural deals frequently stall due to distrust over payment security, Incoterms, and performance guarantees.',
    solution:
      'We structure transparent FOB/CIF export contracts backed by secure Letter of Credit (LC) and Cash Against Documents (CAD) terms.',
  },
];

export const DEAL_STAGES: DealStage[] = [
  {
    stage: '01',
    title: 'Pre-Vetting & NCNDA Execution',
    summary:
      'Both buyer mandate and licensed Ethiopian exporter credentials are verified before introductions, protected under strict NCNDA terms.',
    deliverable: 'Verified Counterparty Dossier · Signed NCNDA',
  },
  {
    stage: '02',
    title: 'Pre-Shipment Sampling & Grade Check',
    summary:
      'Representative harvest samples are dispatched and evaluated against buyer moisture, screen size, and sensory specifications.',
    deliverable: 'Approved Lot Sample · Grade Confirmation',
  },
  {
    stage: '03',
    title: 'FOB/CIF & LC/CAD Structuring',
    summary:
      'Transparent pricing, shipment schedules, and Irrevocable LC or CAD banking instruments are aligned alongside IMFPA commission protection.',
    deliverable: 'Proforma & Sales Contract · IMFPA Protection',
  },
  {
    stage: '04',
    title: 'Container Dispatch & Settlement',
    summary:
      'Licensed exporter executes port loading and shipping documentation, releasing bank-verified settlement upon compliant presentation.',
    deliverable: 'Bill of Lading · Bank Settlement',
  },
];

export const TRADE_CORRIDORS: TradeCorridor[] = [
  {
    id: 'mena-corridor',
    region: 'mena',
    regionLabel: 'Middle East & MENA',
    commodityGroup: 'Coffee, Oilseeds, Spices & Pulses',
    countries: ['Saudi Arabia', 'UAE', 'Egypt', 'Sudan', 'Yemen', 'Turkey', 'Israel'],
    buyerProfiles: 'Regional coffee roasters, food processors, and bulk staple distributors',
  },
  {
    id: 'europe-corridor',
    region: 'europe',
    regionLabel: 'European Union & Switzerland',
    commodityGroup: 'Specialty Coffee, Oilseeds & Pulses',
    countries: ['Germany', 'Netherlands', 'Italy', 'Belgium', 'Switzerland'],
    buyerProfiles: 'Specialty roasteries, European port importers, and ingredient traders',
  },
  {
    id: 'asia-americas-corridor',
    region: 'asia-americas',
    regionLabel: 'Asia-Pacific & North America',
    commodityGroup: 'Coffee, Sesame, Pulses & Spices',
    countries: ['India', 'Pakistan', 'Bangladesh', 'China', 'Japan', 'South Korea', 'Indonesia', 'Vietnam', 'United States'],
    buyerProfiles: 'Bulk grain & pulse houses, oilseed crushers, and specialty importers',
  },
];
