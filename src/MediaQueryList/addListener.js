// @flow

import type {
  ListenersType,
  AddRemoveListenerType,
} from '../types';


type CreateAddListenerType = (listeners: ListenersType) => AddRemoveListenerType;

const createAddListener: CreateAddListenerType = listeners =>
  function addListener(listener) {
    if (!listeners.has(this)) listeners.set(this, []);

    const currentListeners = listeners.get(this);

    if (
      currentListeners &&
      !currentListeners.includes(listener)
    ) currentListeners.push(listener);
  };

export default createAddListener;
