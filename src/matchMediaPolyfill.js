// @flow

/* eslint no-param-reassign: off */

import createEvalQuery from './evalQuery';
import MediaQueryList from './MediaQueryList';
import createAddListener from './addListener';
import createRemoveListener from './removeListener';
import createMatchMedia from './matchMedia';
import createListenerTrigger from './createListenerTrigger';

import type { ContextType, ListenersType } from './types';

const matchMediaPolyfill = (context: ContextType) => {
  const listeners: ListenersType = new Map();

  const evalQuery = createEvalQuery(context);
  const trigger = createListenerTrigger(evalQuery);
  const addListener = createAddListener(listeners);
  const removeListener = createRemoveListener(listeners);
  const matchMedia = createMatchMedia({ evalQuery, addListener, removeListener });

  Object.assign(context, { MediaQueryList, matchMedia });

  context.addEventListener('resize', () => listeners.forEach(trigger));
};

export default matchMediaPolyfill;
