// @flow

/* eslint-env jest */

import MediaQueryList from './MediaQueryList';
import createRemoveListener from './removeListener';

describe('removeListener()', () => {
  it('Removes listeners from MediaQueryList instance', () => {
    const listeners = new Map();

    const listener1 = () => {};
    const listener2 = () => {};
    const listener3 = () => {};

    const mqListListeners = [listener2, listener3];
    const mqList = Object.create(MediaQueryList.prototype);

    // $FlowIgnoreMock
    listeners.delete = jest.fn(
      Map.prototype.delete.bind(listeners),
    );

    listeners.set(mqList, mqListListeners);

    const removeListener = createRemoveListener(listeners).bind(mqList);

    removeListener(listener1);
    expect(mqListListeners).toEqual([listener2, listener3]);
    expect(listeners.get(mqList)).toEqual(mqListListeners);

    removeListener(listener2);
    expect(mqListListeners).toEqual([listener3]);
    expect(listeners.get(mqList)).toEqual(mqListListeners);

    removeListener(listener3);
    expect(mqListListeners).toEqual([]);
    expect(listeners.get(mqList)).toEqual(undefined);
  });
});
