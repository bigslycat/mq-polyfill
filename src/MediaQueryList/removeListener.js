// @flow

import type {
  ListenersType,
  AddRemoveListenerType,
} from '../types';

type CreateRemoveListenerType = (listeners: ListenersType) => AddRemoveListenerType;

const createRemoveListener: CreateRemoveListenerType = listeners =>
  function removeListener(listener) {
    const currentListeners = listeners.get(this);

    if (!currentListeners) return;

    const index = currentListeners.indexOf(listener);

    if (index >= 0) currentListeners.splice(index, 1);
    if (!currentListeners.length) listeners.delete(this);
  };

export default createRemoveListener;
