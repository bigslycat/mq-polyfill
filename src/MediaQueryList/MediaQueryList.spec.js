// @flow

/* eslint-env jest */

import MediaQueryList from './MediaQueryList';

const wrongInstance = Object.create(MediaQueryList.prototype);

const getError = name => new TypeError(
  `'${name}' called on an object that does not implement interface MediaQueryList.`,
);

describe('Interface MediaQueryList', () => {
  it('Forbidden to use as constructor', () =>
    expect(() => new MediaQueryList())
      .toThrow(new TypeError('Illegal constructor.')),
  );

  it('Require to implement "media" property', () =>
    expect(() => wrongInstance.media)
      .toThrow(getError('get media')),
  );

  it('Require to implement "matches" property', () =>
    expect(() => wrongInstance.matches)
      .toThrow(getError('get matches')),
  );

  it('Require to implement "addListener" method', () =>
    expect(wrongInstance.addListener)
      .toThrow(getError('addListener')),
  );

  it('Require to implement "removeListener" method', () =>
    expect(wrongInstance.removeListener)
      .toThrow(getError('removeListener')),
  );

  it('Require to implement "addEventListener" method', () =>
    expect(wrongInstance.addEventListener)
      .toThrow(getError('addEventListener')),
  );

  it('Require to implement "removeEventListener" method', () =>
    expect(wrongInstance.removeEventListener)
      .toThrow(getError('removeEventListener')),
  );
});
