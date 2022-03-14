// @flow

/* eslint-env jest */

import matchMediaPolyfill from './matchMediaPolyfill';

import MediaQueryList, { addListener, removeListener } from './MediaQueryList';
import createEvalQuery from './evalQuery';
import matchMedia from './matchMedia';
import createTrigger from './listenerTrigger';

jest.mock('./MediaQueryList');
jest.mock('./evalQuery');
jest.mock('./matchMedia');
jest.mock('./listenerTrigger');

describe('matchMediaPolyfill', () => {
  it('Create matchMedia function and MediaQueryList in window object', () => {
    const addEventListener = jest.fn();
    const context = { addEventListener };
    const trigger = jest.fn();

    const matchMediaResult = 'MATCH_MEDIA';
    const addListenerResult = 'ADD_LISTENER';
    const removeListenerResult = 'REMOVE_LISTENER';
    const createEvalQueryResult = 'EVAL_QUERY';

    matchMedia.mockReturnValueOnce(matchMediaResult);
    addListener.mockReturnValueOnce(addListenerResult);
    removeListener.mockReturnValueOnce(removeListenerResult);
    createEvalQuery.mockReturnValueOnce(createEvalQueryResult);
    createTrigger.mockReturnValueOnce(trigger);

    matchMediaPolyfill(context);

    expect(matchMedia).toHaveBeenCalledTimes(1);
    expect(matchMedia.mock.calls[0][0]).toEqual({
      addListener: addListenerResult,
      removeListener: removeListenerResult,
      evalQuery: createEvalQueryResult,
    });

    expect(context).toEqual({
      addEventListener,
      MediaQueryList,
      matchMedia: matchMediaResult,
    });

    expect(addListener).toHaveBeenCalledTimes(1);
    expect(addListener.mock.calls[0][0]).toEqual(new Map());

    expect(removeListener).toHaveBeenCalledTimes(1);
    expect(removeListener.mock.calls[0][0]).toEqual(new Map());

    expect(addEventListener).toHaveBeenCalledTimes(1);
    expect(addEventListener.mock.calls[0][0]).toEqual('resize');

    const [[listeners]] = addListener.mock.calls;

    listeners.set(1, 'A');
    listeners.set(2, 'B');

    const [[, resizeHandler]] = addEventListener.mock.calls;

    resizeHandler();

    expect(trigger).toHaveBeenCalledTimes(2);
    expect(trigger).toHaveBeenCalledWith('A', 1, listeners);
    expect(trigger).toHaveBeenCalledWith('B', 2, listeners);
  });
});
