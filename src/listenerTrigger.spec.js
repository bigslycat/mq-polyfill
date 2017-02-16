// @flow

/* eslint-env jest */

import listenerTrigger from './listenerTrigger';

describe('listenerTrigger()', () =>
  it('Run listeners after change MQ mode', () => {
    const evalQuery = jest.fn()
      .mockReturnValueOnce('MATCHES_1')
      .mockReturnValueOnce('NOT_MATCHES_2');

    const listener1 = jest.fn();
    const listener2 = jest.fn();
    const listeners = [listener1, listener2];

    const trigger = listenerTrigger(evalQuery);

    const mq1 = { matches: 'MATCHES_1', media: 'MEDIA_1' };
    // $FlowIgnoreMock
    trigger(listeners, mq1);
    expect(evalQuery).toHaveBeenCalledWith('MEDIA_1');
    expect(mq1).toEqual({ matches: 'MATCHES_1', media: 'MEDIA_1' });
    expect(listener1).toHaveBeenCalledTimes(0);
    expect(listener2).toHaveBeenCalledTimes(0);

    const mq2 = { matches: 'MATCHES_2', media: 'MEDIA_2' };
    // $FlowIgnoreMock
    trigger(listeners, mq2);
    expect(evalQuery).toHaveBeenCalledWith('MEDIA_2');
    expect(mq2).toEqual({ matches: 'NOT_MATCHES_2', media: 'MEDIA_2' });
    expect(listener1).toHaveBeenCalledTimes(1);
    expect(listener2).toHaveBeenCalledTimes(1);
    expect(listener1).toHaveBeenCalledWith(mq2);
    expect(listener2).toHaveBeenCalledWith(mq2);
  }),
);
