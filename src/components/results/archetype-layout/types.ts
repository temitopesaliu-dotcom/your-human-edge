export interface CareerPath {
  title: string;
  desc: string;
  earn: string;
}

export interface BeforeAfterRow {
  before: string;
  after: string;
}

export interface CaseStudy {
  name: string;
  role: string;
  location: string;
  result: string;
  quote: string;
}

export interface IncomeCard {
  label: string;
  title: string;
  range: string;
  desc: string;
  items: string[];
  className: string;
  blurred?: boolean;
}

export interface ArchetypeConfig {
  /** Archetype key for tracking & checkout (e.g. "C", "G", "H", "S") */
  archetypeKey: string;
  /** Wrapper className (e.g. "cr-amplifier", "human-bridge") */
  wrapperClass: string;

  primaryColor: string;
  secondaryColor: string;
  navRgb: string;
  heroGrad: string;
  ctaBg: string;
  /* Hero */
  icon: string;
  name: string;
  tagline: string;
  ceilingLabel: string;
  /** HTML content for the ceiling box paragraph */
  ceilingContent: string;

  /* Who you are */
  whoYouAre: string;
  whoEyeColor: string;
  strengths: string[];
  strengthsEyeColor: string;

  /* Career paths */
  careerSubtitle: string;
  careers: CareerPath[];

  /* Leverage matrix */
  matrixSectionTitle: string;
  matrixTitle: string;
  matrixSubheading: string;
  matrixEyeColor: string;
  matrixBeforeHeader?: string;
  matrixAfterHeader?: string;
  beforeAfter: BeforeAfterRow[];
  matrixFoot: {
    before: { label: string; value: string };
    after: { label: string; value: string };
  };

  /* Testimonials */
  testimonialsEyebrow: string;
  testimonialsEyeColor: string;
  caseStudies: CaseStudy[];

  /* Income model */
  incomeEyeColor: string;
  incomeTitle: string;
  incomeSubheading: string;
  incomePaths: IncomeCard[];
}
