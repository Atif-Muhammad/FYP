// Feature: admin-panel-ui-redesign, Property 2: Stats Cards contain all required elements

import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import * as fc from 'fast-check';
import { Users, Calendar, Newspaper, Trophy } from 'lucide-react';
import StatsCard from '../components/cards/StatsCard';

// Mock recharts — jsdom has no SVG layout engine so ResponsiveContainer
// would render nothing without this.
vi.mock('recharts', () => ({
  ResponsiveContainer: ({ children }) => (
    <div data-testid="chart-container">{children}</div>
  ),
  LineChart: ({ children }) => <div data-testid="line-chart">{children}</div>,
  Line: () => null,
  XAxis: () => null,
  YAxis: () => null,
  Tooltip: () => null,
}));

// The four valid colors and the four icons used in Dashboard
const VALID_COLORS = ['blue', 'green', 'orange', 'purple'];
const VALID_ICONS = [Users, Calendar, Newspaper, Trophy];

// Arbitraries
const colorArb = fc.constantFrom(...VALID_COLORS);
const iconArb = fc.constantFrom(...VALID_ICONS);
const titleArb = fc.string({ minLength: 1, maxLength: 60 });
const valueArb = fc.nat(); // non-negative integer
const chartDataArb = fc.array(
  fc.record({
    date: fc.string({ minLength: 1, maxLength: 20 }),
    value: fc.nat(),
  }),
  { minLength: 0, maxLength: 12 }
);

/**
 * Validates: Requirements 4.3
 *
 * Property 2: Stats Cards contain all required elements
 * For any StatsCard rendered with valid metric data (title, value, chartData,
 * color, icon), the rendered output must contain:
 *   - an SVG icon element
 *   - the metric label (title) text
 *   - the numeric count (value)
 *   - a chart container element
 */
describe('Property 2: Stats Cards contain all required elements', () => {
  it('rendered StatsCard always contains icon, label, count, and chart element', () => {
    fc.assert(
      fc.property(
        titleArb,
        valueArb,
        colorArb,
        iconArb,
        chartDataArb,
        (title, value, color, Icon, chartData) => {
          const { container, unmount } = render(
            <StatsCard
              title={title}
              value={value}
              icon={Icon}
              color={color}
              chartData={chartData}
            />
          );

          // 1. SVG icon element must be present (lucide-react renders SVGs)
          const svg = container.querySelector('svg');
          expect(svg).not.toBeNull();

          // 2. Metric label (title) must appear in the rendered text
          expect(container.textContent).toContain(title);

          // 3. Numeric count must appear in the rendered text
          expect(container.textContent).toContain(String(value));

          // 4. Chart container element must be present
          const chart = container.querySelector('[data-testid="chart-container"]');
          expect(chart).not.toBeNull();

          unmount();
        }
      ),
      { numRuns: 25 }
    );
  });
});

