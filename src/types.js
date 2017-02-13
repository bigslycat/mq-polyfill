// @flow

import MediaQueryList from './MediaQueryList';

export type MatchMediaType = (media: string) => MediaQueryList;

export type ContextType = {
  innerWidth: number,
  innerHeight: number,
  orientation: string,
  screen: {
    width: number,
    height: number,
    orientation: string,
  },
  addEventListener: (eventName: string, cb: () => void) => void,
  MediaQueryList: typeof MediaQueryList,
  matchMedia: MatchMediaType,
};

export type EvalQueryType = (rawQuery: string) => boolean;

export type ListenerType = (mq: MediaQueryList) => void;

export type ListenersType = Map<MediaQueryList, ListenerType[]>;
export type AddRemoveListenerType = (listener: ListenerType) => void;
