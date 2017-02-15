// @flow

import MediaQueryList from './MediaQueryList';

import type {
  ListenerType,
  EvalQueryType,
} from './types';

type TriggerType = (currentlisteners: ListenerType[], mqList: MediaQueryList) => void;
type CreateListenerTriggerType = (evalQuery: EvalQueryType) => TriggerType;

const listenerTrigger: CreateListenerTriggerType = evalQuery =>
  (currentlisteners, mqList) => {
    const matches = evalQuery(mqList.media);

    if (mqList.matches === matches) return;

    Object.defineProperties(mqList, {
      matches: { enumerable: true, configurable: true, value: matches },
    });

    currentlisteners.forEach(listener => listener(mqList));
  };

export default listenerTrigger;
