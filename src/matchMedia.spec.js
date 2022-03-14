// @flow

/* eslint-env jest */

import createMatchMedia from './matchMedia';
import MediaQueryList from './MediaQueryList';

describe('matchMedia()', () =>
  it('Eval MQ and return MediaQueryList object', () => {
    const matches = 'RESULT';
    const media = 'MEDIA';

    const evalQuery = jest.fn()
      .mockReturnValueOnce(matches);

    const addListener = jest.fn();
    const removeListener = jest.fn();

    const matchMedia = createMatchMedia({
      evalQuery,
      addListener,
      removeListener,
    });

    const mq = matchMedia(media);

    expect(mq).toBeInstanceOf(MediaQueryList);

    expect(Object.getOwnPropertyDescriptor(mq, 'media'))
      .toEqual({
        enumerable: true,
        configurable: false,
        writable: false,
        value: media,
      });

    expect(Object.getOwnPropertyDescriptor(mq, 'matches'))
      .toEqual({
        enumerable: true,
        configurable: true,
        writable: false,
        value: matches,
      });

    expect(Object.getOwnPropertyDescriptor(mq, 'addListener'))
      .toEqual({
        enumerable: false,
        configurable: false,
        writable: false,
        value: addListener,
      });

    expect(Object.getOwnPropertyDescriptor(mq, 'removeListener'))
      .toEqual({
        enumerable: false,
        configurable: false,
        writable: false,
        value: removeListener,
      });

    const listener = jest.fn();
    mq.addEventListener('change', listener);
    expect(addListener).toHaveBeenCalledWith(listener);
    mq.removeEventListener('change', listener);
    expect(removeListener).toHaveBeenCalledWith(listener);
  }),
);
