// @flow

/* eslint-env jest */

import compileQuery from './compileQuery';

describe('compileQuery()', () => {
  it('Compiles a media query to JS code', () => {
    expect(compileQuery(
      'screen and (min-width: 70em), print and ((min-width: 10em) or (max-width: 20cm))',
    )).toEqual([
      'try { return',
      '!!((true && (media.width >= 1120)) ||',
      '(false && ((media.width >= 160 || media.width <= 755.904))))',
      '} catch(e) { return false }',
    ].join(' '));
  });
});
