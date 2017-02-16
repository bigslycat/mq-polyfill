// @flow

/* eslint-env jest */

import createEvalQuery from './evalQuery';
import compileQuery from './compileQuery';

jest.mock('./compileQuery');

describe('evalQuery()', () => {
  it('Evals a compiled media query', () => {
    compileQuery
      .mockImplementationOnce(() => 'return true')
      .mockImplementationOnce(() => 'return false');

    // $FlowIgnoreMock
    const evalQuery = createEvalQuery({
      innerWidth: 'WIDTH',
      innerHeight: 'HEIGHT',
      screen: { orientation: { type: 'ORIENTATION' } },
    });

    expect(evalQuery('MQ1')).toBe(true);
    expect(evalQuery('MQ2')).toBe(false);
    expect(compileQuery).toHaveBeenCalledTimes(2);
    expect(compileQuery).toHaveBeenCalledWith('MQ1');
    expect(compileQuery).toHaveBeenCalledWith('MQ2');
  });
});
