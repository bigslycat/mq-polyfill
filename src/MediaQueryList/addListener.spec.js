// @flow

/* eslint-env jest */

import MediaQueryList from './MediaQueryList';
import createAddListener from './addListener';

describe('addListener()', () => {
  it('Adds listeners to MediaQueryList instance', () => {
    const listeners = new Map();

    // $FlowIgnoreMock
    listeners.set = jest.fn(
      Map.prototype.set.bind(listeners),
    );

    const listener = () => {};
    const mqList = Object.create(MediaQueryList.prototype);

    const addListener = createAddListener(listeners).bind(mqList);

    expect(listeners.get(mqList)).toBeUndefined();

    addListener(listener);
    expect(listeners.set).toHaveBeenCalledTimes(1);
    expect(listeners.get(mqList)).toEqual([listener]);

    addListener(listener);
    expect(listeners.set).toHaveBeenCalledTimes(1);
    expect(listeners.get(mqList)).toEqual([listener]);
  });
});
