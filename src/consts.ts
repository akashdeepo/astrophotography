// Edit here to change site-wide text without hunting through templates.

export const SITE = {
  title: 'Deep Field',
  subtitle: 'an astrophotography journal',
  description:
    'Akash Deep’s astrophotography journal — phone-shot deep-sky and wide-field images, processed and documented.',
  author: 'Akash Deep',
  url: 'https://akashdeepo.github.io/astrophotography',
  github: 'https://github.com/akashdeepo/astrophotography',
} as const;

// Navigation links shown in the header.
export const NAV: readonly { href: string; label: string }[] = [
  { href: '/', label: 'Home' },
  { href: '/archive/', label: 'Archive' },
  { href: '/about/', label: 'About' },
];

// Closed tag taxonomy. Add a new entry here when you shoot a new category.
// The content schema validates frontmatter tags against this list,
// so typos fail at build time instead of silently hiding posts from filters.
export const TAGS = [
  'milky-way',
  'wide-field',
  'deep-sky',
  'planets',
  'moon',
  'solar',
  'lunar',
  'aurora',
  'constellation',
] as const;

export type Tag = (typeof TAGS)[number];

// Human-readable labels for tags (shown in UI).
export const TAG_LABELS: Record<Tag, string> = {
  'milky-way': 'Milky Way',
  'wide-field': 'Wide Field',
  'deep-sky': 'Deep Sky',
  planets: 'Planets',
  moon: 'Moon',
  solar: 'Solar',
  lunar: 'Lunar',
  aurora: 'Aurora',
  constellation: 'Constellation',
};
