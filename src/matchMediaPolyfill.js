// @flow

/* eslint no-param-reassign: off */

import MediaQueryList, { addListener, removeListener } from './MediaQueryList';

import createEvalQuery from './evalQuery';
import matchMedia from './matchMedia';
import createTrigger from './listenerTrigger';

import type { ContextType, ListenersType } from './types';

const matchMediaPolyfill = (context: ContextType) => {
  const listeners: ListenersType = new Map();

  const evalQuery = createEvalQuery(context);

  Object.assign(context, {
    MediaQueryList,
    matchMedia: matchMedia({
      addListener: addListener(listeners),
      removeListener: removeListener(listeners),
      evalQuery,
    }),
  });

  const trigger = createTrigger(evalQuery);

  context.addEventListener('resize', () => listeners.forEach(trigger));
};

export default matchMediaPolyfill;
