// Feature: admin-panel-ui-redesign, Property 3: Card action buttons are always present and accessible

import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import * as fc from 'fast-check';
import MemberCard from '../components/cards/MemberCard';
import ExectivesCard from '../components/cards/ExectivesCard';
import EventCard from '../components/cards/EventCard';
import ProgramCard from '../components/cards/ProgramCard';
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

// Mock all modal components to avoid deep rendering
vi.mock('../components/models/MemberModel', () => ({ default: () => null }));
vi.mock('../components/models/ExectivesModal', () => ({ default: () => null }));
vi.mock('../components/models/EventModal', () => ({ default: () => null }));
vi.mock('../components/models/ProgramModal', () => ({ default: () => null }));
vi.mock('../components/models/NewsModal', () => ({ default: () => null }));
vi.mock('../components/models/GalleryModal', () => ({ default: () => null }));
vi.mock('../components/models/AchievementsModal', () => ({ default: () => null }));

// ── Arbitraries ──────────────────────────────────────────────────────────────

const nonEmptyString = fc.string({ minLength: 1, maxLength: 60 });
const idArb = fc.string({ minLength: 1, maxLength: 24 });

const memberArb = fc.record({
  _id: idArb,
  name: nonEmptyString,
  CNIC: fc.string({ minLength: 13, maxLength: 13 }),
});

const executiveArb = fc.record({
  _id: idArb,
  name: nonEmptyString,
  role: nonEmptyString,
});

const eventArb = fc.record({
  _id: idArb,
  title: nonEmptyString,
});

const programArb = fc.record({
  _id: idArb,
  title: nonEmptyString,
});

const newsArb = fc.record({
  _id: idArb,
  title: nonEmptyString,
});

const galleryArb = fc.record({
  _id: idArb,
  title: nonEmptyString,
  image: fc.record({ url: fc.webUrl() }),
});

const achievementArb = fc.record({
  _id: idArb,
  title: nonEmptyString,
});

// ── Helper ────────────────────────────────────────────────────────────────────

/**
 * Returns all buttons with a non-empty aria-label from the container.
 */
function getAccessibleButtons(container) {
  const allButtons = Array.from(container.querySelectorAll('button'));
  return allButtons.filter(
    (btn) => btn.getAttribute('aria-label') && btn.getAttribute('aria-label').trim() !== ''
  );
}

// ── Tests ─────────────────────────────────────────────────────────────────────

/**
 * Validates: Requirements 6.2, 6.7
 *
 * Property 3: Card action buttons are always present and accessible
 * For any card component rendered with valid data, the rendered output must
 * contain exactly 2 buttons with non-empty aria-label attributes (edit + delete).
 */
describe('Property 3: Card action buttons are always present and accessible', () => {
  const noop = () => {};

  it('MemberCard always has 2 accessible action buttons', () => {
    fc.assert(
      fc.property(memberArb, (member) => {
        const { container, unmount } = render(
          <MemberCard member={member} onUpdate={noop} onDelete={noop} />
        );
        const accessibleButtons = getAccessibleButtons(container);
        expect(accessibleButtons.length).toBe(2);
        accessibleButtons.forEach((btn) => {
          expect(btn.getAttribute('aria-label').trim()).not.toBe('');
        });
        unmount();
      }),
      { numRuns: 25 }
    );
  });

  it('ExectivesCard always has 2 accessible action buttons', () => {
    fc.assert(
      fc.property(executiveArb, (member) => {
        const { container, unmount } = render(
          <ExectivesCard member={member} onUpdate={noop} onDelete={noop} />
        );
        const accessibleButtons = getAccessibleButtons(container);
        expect(accessibleButtons.length).toBe(2);
        accessibleButtons.forEach((btn) => {
          expect(btn.getAttribute('aria-label').trim()).not.toBe('');
        });
        unmount();
      }),
      { numRuns: 25 }
    );
  });

  it('EventCard always has 2 accessible action buttons', () => {
    fc.assert(
      fc.property(eventArb, (event) => {
        const { container, unmount } = render(
          <EventCard
            event={event}
            expanded={false}
            onToggle={noop}
            onUpdate={noop}
            onDelete={noop}
          />
        );
        const accessibleButtons = getAccessibleButtons(container);
        expect(accessibleButtons.length).toBe(2);
        accessibleButtons.forEach((btn) => {
          expect(btn.getAttribute('aria-label').trim()).not.toBe('');
        });
        unmount();
      }),
      { numRuns: 25 }
    );
  });

  it('ProgramCard always has 2 accessible action buttons', () => {
    fc.assert(
      fc.property(programArb, (program) => {
        const { container, unmount } = render(
          <ProgramCard
            program={program}
            expanded={false}
            onToggle={noop}
            onUpdate={noop}
            onDelete={noop}
          />
        );
        const accessibleButtons = getAccessibleButtons(container);
        expect(accessibleButtons.length).toBe(2);
        accessibleButtons.forEach((btn) => {
          expect(btn.getAttribute('aria-label').trim()).not.toBe('');
        });
        unmount();
      }),
      { numRuns: 25 }
    );
  });

  it('NewsCard always has 2 accessible action buttons', () => {
    fc.assert(
      fc.property(newsArb, (news) => {
        const { container, unmount } = render(
          <NewsCard
            news={news}
            expanded={false}
            onToggle={noop}
            onUpdate={noop}
            onDelete={noop}
          />
        );
        const accessibleButtons = getAccessibleButtons(container);
        expect(accessibleButtons.length).toBe(2);
        accessibleButtons.forEach((btn) => {
          expect(btn.getAttribute('aria-label').trim()).not.toBe('');
        });
        unmount();
      }),
      { numRuns: 25 }
    );
  });

  it('GalleryCard always has 2 accessible action buttons', () => {
    fc.assert(
      fc.property(galleryArb, (media) => {
        const { container, unmount } = render(
          <GalleryCard
            media={media}
            expanded={false}
            onToggle={noop}
            onUpdate={noop}
            onDelete={noop}
          />
        );
        const accessibleButtons = getAccessibleButtons(container);
        expect(accessibleButtons.length).toBe(2);
        accessibleButtons.forEach((btn) => {
          expect(btn.getAttribute('aria-label').trim()).not.toBe('');
        });
        unmount();
      }),
      { numRuns: 25 }
    );
  });

  it('AchievementsCard always has 2 accessible action buttons', () => {
    fc.assert(
      fc.property(achievementArb, (achievement) => {
        const { container, unmount } = render(
          <AchievementCard
            achievement={achievement}
            onUpdate={noop}
            onDelete={noop}
          />
        );
        const accessibleButtons = getAccessibleButtons(container);
        expect(accessibleButtons.length).toBe(2);
        accessibleButtons.forEach((btn) => {
          expect(btn.getAttribute('aria-label').trim()).not.toBe('');
        });
        unmount();
      }),
      { numRuns: 25 }
    );
  });
});

