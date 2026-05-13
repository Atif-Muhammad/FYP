// Feature: admin-panel-ui-redesign, Property 4: Member/Executive cards always show avatar or fallback

import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import * as fc from 'fast-check';
import MemberCard from '../components/cards/MemberCard';
import ExectivesCard from '../components/cards/ExectivesCard';

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

// ── Arbitraries ──────────────────────────────────────────────────────────────

const nonEmptyString = fc.string({ minLength: 1, maxLength: 60 });
const idArb = fc.string({ minLength: 1, maxLength: 24 });

/**
 * Generates an image field that is one of:
 *   - { url: someUrl }   (has image)
 *   - { url: undefined } (image object but no url)
 *   - undefined          (no image at all)
 */
const imageArb = fc.oneof(
  fc.webUrl().map((url) => ({ url })),
  fc.constant({ url: undefined }),
  fc.constant(undefined)
);

const memberArb = fc.record({
  _id: idArb,
  name: nonEmptyString,
  CNIC: fc.string({ minLength: 13, maxLength: 13 }),
  image: imageArb,
});

const executiveArb = fc.record({
  _id: idArb,
  name: nonEmptyString,
  role: nonEmptyString,
  image: imageArb,
});

// ── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Finds an <img> whose alt attribute exactly matches memberName using DOM
 * traversal (avoids CSS selector injection issues with special characters).
 */
function findImgByAlt(container, memberName) {
  return Array.from(container.querySelectorAll('img')).find(
    (img) => img.getAttribute('alt') === memberName
  ) || null;
}

/**
 * Returns true if the container has an <img> with alt matching the member name,
 * OR an SVG element (the User fallback icon).
 */
function hasAvatarOrFallback(container, memberName) {
  if (findImgByAlt(container, memberName)) return true;
  return container.querySelector('svg') !== null;
}

// ── Tests ─────────────────────────────────────────────────────────────────────

/**
 * Validates: Requirements 6.4
 *
 * Property 4: Member/Executive cards always show avatar or fallback
 * For any member/executive with or without image.url, the rendered card must
 * contain either an <img> with alt={member.name} or an SVG fallback icon,
 * and the member's name must appear in the rendered output.
 */
describe('Property 4: Member/Executive cards always show avatar or fallback', () => {
  const noop = () => {};

  it('MemberCard always renders avatar or fallback icon alongside name', () => {
    fc.assert(
      fc.property(memberArb, (member) => {
        const { container, unmount } = render(
          <MemberCard member={member} onUpdate={noop} onDelete={noop} />
        );

        // Name must appear in the rendered output
        expect(container.textContent).toContain(member.name);

        // Must have either an <img alt={member.name}> or an SVG fallback
        expect(hasAvatarOrFallback(container, member.name)).toBe(true);

        // When image.url is present, must render <img> with correct alt
        if (member.image?.url) {
          const img = findImgByAlt(container, member.name);
          expect(img).not.toBeNull();
          expect(img.getAttribute('alt')).toBe(member.name);
        } else {
          // No valid url — must render SVG fallback
          const svg = container.querySelector('svg');
          expect(svg).not.toBeNull();
        }

        unmount();
      }),
      { numRuns: 25 }
    );
  });

  it('ExectivesCard always renders avatar or fallback icon alongside name', () => {
    fc.assert(
      fc.property(executiveArb, (member) => {
        const { container, unmount } = render(
          <ExectivesCard member={member} onUpdate={noop} onDelete={noop} />
        );

        // Name must appear in the rendered output (rendered as "name (role)")
        expect(container.textContent).toContain(member.name);

        // Must have either an <img alt={member.name}> or an SVG fallback
        expect(hasAvatarOrFallback(container, member.name)).toBe(true);

        // When image.url is present, must render <img> with correct alt
        if (member.image?.url) {
          const img = findImgByAlt(container, member.name);
          expect(img).not.toBeNull();
          expect(img.getAttribute('alt')).toBe(member.name);
        } else {
          // No valid url — must render SVG fallback
          const svg = container.querySelector('svg');
          expect(svg).not.toBeNull();
        }

        unmount();
      }),
      { numRuns: 25 }
    );
  });
});

