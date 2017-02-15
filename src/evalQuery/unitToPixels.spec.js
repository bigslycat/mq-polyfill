// @flow

/* eslint-env jest */

import unitToPixels from './unitToPixels';

describe('unitToPixels()', () => {
  it('Returns an equivalent units in pixels', () =>
    Object.entries({
      cm: 0.3937 * 96,
      em: 16,
      rem: 16,
      in: 96,
      dppx: 96,
      mm: (0.3937 * 96) / 10,
      pc: (12 * 96) / 72,
      pt: 96 / 72,
      px: 1,
    }).forEach(
      (unit, result) =>
        typeof unit === 'string' &&
          expect(unitToPixels(unit)).toBe(result),
    ),
  );
});
