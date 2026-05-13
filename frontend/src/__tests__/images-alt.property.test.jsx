// Feature: admin-panel-ui-redesign, Property 11: All rendered images have alt attributes

import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import * as fc from 'fast-check';
import MemberCard from '../components/cards/MemberCard';
import ExectivesCard from '../components/cards/ExectivesCard';
import NewsCard from '../components/cards/NewsCard';
import GalleryCard from '../components/cards/GalleryCard';
import AchievementCard from '../components/cards/AchievementsCard';

// Mock framer-motion — uses browser APIs not available in jsdom
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }) => children,
}));

// Mock react-router-dom (used transitively by some components)
vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn(),
  NavLink: ({ children }) => <a>{children}</a>,
}));

// Mock modal components to avoid deep rendering
vi.mock('../components/models/MemberModel', () => ({ default: () => null }));
vi.mock('../components/models/ExectivesModal', () => ({ default: () => null }));
vi.mock('../components/models/NewsModal', () => ({ default: () => null }));
vi.mock('../components/models/GalleryModal', () => ({ default: () => null }));
vi.mock('../components/models/AchievementsModal', () => ({ default: () => null }));

// ── Arbitraries ──────────────────────────────────────────────────────────────

const nonEmptyString = fc.string({ minLength: 1, maxLength: 60 });
const urlArb = fc.webUrl();

/** image field always with a url to ensure <img> is rendered */
const imageWithUrlArb = urlArb.map((url) => ({ url }));

const memberArb = fc.record({
  _id: fc.string({ minLength: 1, maxLength: 24 }),
  name: nonEmptyString,
  CNIC: fc.string({ minLength: 13, maxLength: 13 }),
  image: imageWithUrlArb,
});

const executiveArb = fc.record({
  _id: fc.string({ minLength: 1, maxLength: 24 }),
  name: nonEmptyString,
  role: nonEmptyString,
  image: imageWithUrlArb,
});

const newsArb = fc.record({
  _id: fc.string({ minLength: 1, maxLength: 24 }),
  title: nonEmptyString,
  description: nonEmptyString,
  image: imageWithUrlArb,
  createdAt: fc.date().map((d) => d.toISOString()),
  validityType: nonEmptyString,
});

const galleryArb = fc.record({
  _id: fc.string({ minLength: 1, maxLength: 24 }),
  title: nonEmptyString,
  description: nonEmptyString,
  image: imageWithUrlArb,
});

const achievementArb = fc.record({
  _id: fc.string({ minLength: 1, maxLength: 24 }),
  title: nonEmptyString,
  description: nonEmptyString,
  image: imageWithUrlArb,
});

// ── Helper ────────────────────────────────────────────────────────────────────

/** Assert every <img> in the container has an alt attribute present */
function assertAllImgsHaveAlt(container) {
  const imgs = Array.from(container.querySelectorAll('img'));
  for (const img of imgs) {
    expect(img.hasAttribute('alt')).toBe(true);
  }
}

// ── Tests ─────────────────────────────────────────────────────────────────────

/**
 * Validates: Requirements 11.4
 *
 * Property 11: All rendered images have alt attributes
 * For any card that renders an <img>, every such element must have an alt
 * attribute present (the value may be empty string for decorative images).
 */
describe('Property 11: All rendered images have alt attributes', () => {
  const noop = () => {};

  it('MemberCard: every <img> has an alt attribute', () => {
    fc.assert(
      fc.property(memberArb, (member) => {
        const { container, unmount } = render(
          <MemberCard member={member} onUpdate={noop} onDelete={noop} />
        );
        assertAllImgsHaveAlt(container);
        unmount();
      }),
      { numRuns: 25 }
    );
  });

  it('ExectivesCard: every <img> has an alt attribute', () => {
    fc.assert(
      fc.property(executiveArb, (member) => {
        const { container, unmount } = render(
          <ExectivesCard member={member} onUpdate={noop} onDelete={noop} />
        );
        assertAllImgsHaveAlt(container);
        unmount();
      }),
      { numRuns: 25 }
    );
  });

  it('NewsCard: every <img> has an alt attribute', () => {
    fc.assert(
      fc.property(newsArb, (news) => {
        const { container, unmount } = render(
          <NewsCard
            news={news}
            onUpdate={noop}
            expanded={false}
            onToggle={noop}
            onDelete={noop}
          />
        );
        assertAllImgsHaveAlt(container);
        unmount();
      }),
      { numRuns: 25 }
    );
  });

  it('GalleryCard: every <img> has an alt attribute', () => {
    fc.assert(
      fc.property(galleryArb, (media) => {
        const { container, unmount } = render(
          <GalleryCard
            media={media}
            onUpdate={noop}
            expanded={false}
            onToggle={noop}
            onDelete={noop}
          />
        );
        assertAllImgsHaveAlt(container);
        unmount();
      }),
      { numRuns: 25 }
    );
  });

  it('AchievementsCard: every <img> has an alt attribute', () => {
    fc.assert(
      fc.property(achievementArb, (achievement) => {
        const { container, unmount } = render(
          <AchievementCard
            achievement={achievement}
            onUpdate={noop}
            onDelete={noop}
          />
        );
        assertAllImgsHaveAlt(container);
        unmount();
      }),
      { numRuns: 25 }
    );
  });
});

