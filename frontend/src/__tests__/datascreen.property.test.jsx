// Feature: admin-panel-ui-redesign, Property 12: DataScreen header shows section name and Add button for all section types

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import * as fc from 'fast-check';

// Mock TanStack Query so DataScreen can render without a real server
vi.mock('@tanstack/react-query', () => ({
  useInfiniteQuery: () => ({
    data: { pages: [{ data: [], page: 1, pages: 1 }] },
    isLoading: false,
    error: null,
    fetchNextPage: vi.fn(),
    hasNextPage: false,
    isFetchingNextPage: false,
  }),
  useMutation: () => ({
    mutate: vi.fn(),
    isPending: false,
  }),
  useQueryClient: () => ({
    invalidateQueries: vi.fn(),
  }),
}));

// Mock all API functions
vi.mock('../../config/apis', () => ({
  getMembers: vi.fn(),
  createMember: vi.fn(),
  updateMember: vi.fn(),
  deleteMember: vi.fn(),
  getPrograms: vi.fn(),
  createProgram: vi.fn(),
  updateProgram: vi.fn(),
  deleteProgram: vi.fn(),
  getEvents: vi.fn(),
  createEvent: vi.fn(),
  updateEvent: vi.fn(),
  deleteEvent: vi.fn(),
  getGallery: vi.fn(),
  createGallery: vi.fn(),
  updateGallery: vi.fn(),
  deleteGallery: vi.fn(),
  getUpdates: vi.fn(),
  createUpdate: vi.fn(),
  updateUpdate: vi.fn(),
  deleteUpdate: vi.fn(),
  getExecs: vi.fn(),
  createExec: vi.fn(),
  updateExec: vi.fn(),
  deleteExec: vi.fn(),
  getAchievements: vi.fn(),
  createAchievement: vi.fn(),
  updateAchievement: vi.fn(),
  deleteAchievement: vi.fn(),
  getAwards: vi.fn(),
  createAward: vi.fn(),
  updateAward: vi.fn(),
  deleteAward: vi.fn(),
}));

import DataScreen from '../pages/DataScreen';

const VALID_SECTIONS = [
  'members',
  'exectives',
  'programs',
  'events',
  'news',
  'gallery',
  'achievements',
  'awards',
];

const DISPLAY_NAMES = {
  members: 'Members',
  exectives: 'Executives',
  programs: 'Programs',
  events: 'Events',
  news: 'News',
  gallery: 'Gallery',
  achievements: 'Achievements',
  awards: 'Awards',
};

function renderDataScreen(section) {
  return render(
    <MemoryRouter initialEntries={[`/data/${section}`]}>
      <Routes>
        <Route path="/data/:for" element={<DataScreen />} />
      </Routes>
    </MemoryRouter>
  );
}

/**
 * Validates: Requirements 5.1
 *
 * Property 12: DataScreen header shows section name and Add button for all section types
 * For any valid `dataFor` parameter value, the DataScreen should render a header
 * containing the capitalised section name and an Add button.
 */
describe('Property 12: DataScreen header shows section name and Add button for all section types', () => {
  it('renders capitalised section name and Add button for every valid section', () => {
    const sectionArb = fc.constantFrom(...VALID_SECTIONS);

    fc.assert(
      fc.property(sectionArb, (section) => {
        const { unmount } = renderDataScreen(section);

        const expectedName = DISPLAY_NAMES[section];

        // h1 should contain the display name
        const heading = screen.getByRole('heading', { level: 1 });
        expect(heading.textContent.trim()).toBe(expectedName);

        // There should be a button containing "Add"
        const addButton = screen.getByRole('button', { name: /add/i });
        expect(addButton).toBeTruthy();

        unmount();
      }),
      { numRuns: 25 }
    );
  });
});

