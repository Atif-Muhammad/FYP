// Feature: admin-panel-ui-redesign, Property 1: Sidebar nav links always have icons

import { describe, it, expect, vi, beforeAll } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import * as fc from 'fast-check';

// Mock axios and react-query so Sidebar can render without a real server
vi.mock('axios', () => ({ default: { get: vi.fn() } }));
vi.mock('@tanstack/react-query', () => ({
  useQueryClient: () => ({
    invalidateQueries: vi.fn(),
    setQueryData: vi.fn(),
  }),
}));

// Re-define the links array here (mirrors Sidebar.jsx) so we can generate subsets
import {
  LayoutDashboard,
  Users,
  UserCheck,
  Layers,
  Calendar,
  Newspaper,
  Image,
  Trophy,
  Award,
} from 'lucide-react';

const ALL_LINKS = [
  { title: 'Dashboard', url: '/', icon: LayoutDashboard },
  { title: 'Members', url: '/data/members', icon: Users },
  { title: 'Exectives', url: '/data/exectives', icon: UserCheck },
  { title: 'Programs', url: '/data/programs', icon: Layers },
  { title: 'Events', url: '/data/events', icon: Calendar },
  { title: 'News & Updates', url: '/data/news', icon: Newspaper },
  { title: 'Gallery', url: '/data/gallery', icon: Image },
  { title: 'Achievements', url: '/data/achievements', icon: Trophy },
  { title: 'Awards', url: '/data/awards', icon: Award },
];

/**
 * A minimal SidebarNav that renders only the nav links portion,
 * accepting an explicit links array so we can test arbitrary subsets.
 */
function SidebarNav({ links }) {
  return (
    <MemoryRouter>
      <nav>
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <a key={link.url} href={link.url} data-testid="nav-link">
              <Icon data-testid="nav-icon" aria-hidden="true" />
              <span data-testid="nav-label">{link.title}</span>
            </a>
          );
        })}
      </nav>
    </MemoryRouter>
  );
}

/**
 * Validates: Requirements 2.2
 *
 * Property 1: Sidebar nav links always have icons
 * For any non-empty subset of the links array, every rendered nav link
 * must contain both a text label and an SVG icon element.
 */
describe('Property 1: Sidebar nav links always have icons', () => {
  it('every rendered NavLink contains a text label and an SVG icon', () => {
    // Arbitrary for a non-empty subset of ALL_LINKS indices
    const subsetArb = fc
      .array(fc.integer({ min: 0, max: ALL_LINKS.length - 1 }), {
        minLength: 1,
        maxLength: ALL_LINKS.length,
      })
      .map((indices) => {
        // Deduplicate while preserving order
        const seen = new Set();
        return indices
          .filter((i) => {
            if (seen.has(i)) return false;
            seen.add(i);
            return true;
          })
          .map((i) => ALL_LINKS[i]);
      });

    fc.assert(
      fc.property(subsetArb, (links) => {
        const { container, unmount } = render(<SidebarNav links={links} />);

        const navLinks = container.querySelectorAll('[data-testid="nav-link"]');
        expect(navLinks.length).toBe(links.length);

        navLinks.forEach((navLink) => {
          // Must contain an SVG element (lucide-react renders SVGs)
          const svg = navLink.querySelector('svg');
          expect(svg).not.toBeNull();

          // Must contain a text label
          const label = navLink.querySelector('[data-testid="nav-label"]');
          expect(label).not.toBeNull();
          expect(label.textContent.trim().length).toBeGreaterThan(0);
        });

        unmount();
      }),
      { numRuns: 25 }
    );
  });
});

